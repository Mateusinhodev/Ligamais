<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Goal;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        return response()->json($this->montarPerfil($request->user()));
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:120'],
            'apelido' => ['sometimes', 'nullable', 'string', 'max:60'],
            'cidade' => ['sometimes', 'nullable', 'string', 'max:120'],
            'posicao' => ['sometimes', 'nullable', 'string', 'max:60'],
            'numero_camisa' => ['sometimes', 'nullable', 'integer', 'min:0', 'max:999'],
            'foto' => ['sometimes', 'nullable', 'string'],
        ]);

        $request->user()->update($data);

        return response()->json($this->montarPerfil($request->user()));
    }

    private function montarPerfil($user): array
    {
        $participacoesAprovadas = $user->participations()->where('status', 'aprovado')->with('competition')->get();

        $jogos = Goal::whereHas('match', function ($q) use ($user) {
            $q->whereHas('goals', fn ($g) => $g->where('user_id', $user->id));
        })->distinct('match_id')->count('match_id');

        $totalGols = (int) Goal::where('user_id', $user->id)->sum('quantidade');

        $competicoesDisputadas = $participacoesAprovadas->count();
        $titulos = $participacoesAprovadas->filter(fn ($p) => $p->competition->status === 'encerrada'
            && $p->competition->campeao_equipe_id === $p->team_id
        )->count();

        return [
            'user' => $user,
            'estatisticas' => [
                'jogos' => $jogos,
                'gols' => $totalGols,
                'media_gols' => $jogos > 0 ? round($totalGols / $jogos, 2) : 0,
                'competicoes_disputadas' => $competicoesDisputadas,
                'titulos' => $titulos,
            ],
            'historico' => $user->historico(),
        ];
    }
}
