<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCompetitionRequest;
use App\Models\Competition;
use App\Models\Participant;
use Endroid\QrCode\Builder\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CompetitionController extends Controller
{
    public function index(Request $request)
    {
        // Competições em que o usuário participa ou criou
        $competitions = Competition::where('created_by', $request->user()->id)
            ->orWhereHas('participants', fn ($q) => $q->where('user_id', $request->user()->id)->where('status', 'aprovado'))
            ->latest()
            ->get();

        return response()->json($competitions);
    }

    public function store(StoreCompetitionRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = $request->user()->id;
        $data['codigo_convite'] = strtoupper(Str::random(6));

        $competition = Competition::create($data);

        // Criador vira participante e administrador automaticamente
        Participant::create([
            'competition_id' => $competition->id,
            'user_id' => $request->user()->id,
            'status' => 'aprovado',
            'is_admin' => true,
        ]);

        return response()->json($competition, 201);
    }

    public function show(Competition $competition)
    {
        return response()->json($competition->load('teams'));
    }

    public function update(Request $request, Competition $competition)
    {
        $this->autorizarAdmin($request, $competition);

        $data = $request->validate([
            'nome' => ['sometimes', 'string', 'max:120'],
            'descricao' => ['sometimes', 'nullable', 'string'],
            'imagem' => ['sometimes', 'nullable', 'string'],
            'data_inicial' => ['sometimes', 'date'],
            'data_final' => ['sometimes', 'date'],
        ]);

        $competition->update($data);

        return response()->json($competition);
    }

    public function encerrar(Request $request, Competition $competition)
    {
        $this->autorizarAdmin($request, $competition);

        $data = $request->validate([
            'campeao_equipe_id' => ['required', 'integer', 'exists:teams,id'],
        ]);

        $competition->update([
            'status' => 'encerrada',
            'campeao_equipe_id' => $data['campeao_equipe_id'],
        ]);

        return response()->json($competition);
    }

    /**
     * Retorna código, link e QR Code para convite de novos participantes.
     */
    public function convite(Competition $competition)
    {
        $link = rtrim(config('app.frontend_url', config('app.url')), '/')."/competicoes/entrar/{$competition->codigo_convite}";

        $qrCode = Builder::create()
            ->data($link)
            ->size(300)
            ->margin(10)
            ->build();

        return response()->json([
            'codigo' => $competition->codigo_convite,
            'link' => $link,
            'qrcode_base64' => 'data:'.$qrCode->getMimeType().';base64,'.base64_encode($qrCode->getString()),
        ]);
    }

    private function autorizarAdmin(Request $request, Competition $competition): void
    {
        abort_unless($competition->isAdmin($request->user()->id), 403, 'Apenas administradores podem realizar esta ação.');
    }
}
