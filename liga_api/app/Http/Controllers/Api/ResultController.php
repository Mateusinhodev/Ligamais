<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreResultRequest;
use App\Models\Competition;
use App\Models\Goal;
use App\Models\MatchGame;
use Illuminate\Support\Facades\DB;

class ResultController extends Controller
{
    /**
     * Registra o placar da partida e os gols por jogador.
     * Só é confirmada como "finalizada" se a soma dos gols bater com o placar;
     * caso contrário, fica "pendente_validacao".
     */
    public function store(StoreResultRequest $request, Competition $competition, MatchGame $match)
    {
        abort_unless($competition->isAdmin($request->user()->id), 403, 'Apenas administradores podem registrar resultados.');

        $data = $request->validated();
        $gols = $data['gols'] ?? [];

        $golsMandante = collect($gols)->where('team_id', $match->mandante_id)->sum('quantidade');
        $golsVisitante = collect($gols)->where('team_id', $match->visitante_id)->sum('quantidade');

        $divergente = ! empty($gols) && (
            $golsMandante !== (int) $data['placar_mandante'] ||
            $golsVisitante !== (int) $data['placar_visitante']
        );

        DB::transaction(function () use ($match, $data, $gols, $divergente) {
            $match->goals()->delete();

            foreach ($gols as $gol) {
                Goal::create([
                    'match_id' => $match->id,
                    'team_id' => $gol['team_id'],
                    'user_id' => $gol['user_id'],
                    'quantidade' => $gol['quantidade'],
                ]);
            }

            $match->update([
                'placar_mandante' => $data['placar_mandante'],
                'placar_visitante' => $data['placar_visitante'],
                'status' => $divergente ? 'pendente_validacao' : 'finalizada',
            ]);
        });

        return response()->json([
            'match' => $match->fresh(['goals.user', 'goals.team']),
            'divergente' => $divergente,
            'mensagem' => $divergente
                ? 'A soma dos gols informados não bate com o placar. Resultado ficou pendente de validação.'
                : 'Resultado registrado com sucesso.',
        ]);
    }
}
