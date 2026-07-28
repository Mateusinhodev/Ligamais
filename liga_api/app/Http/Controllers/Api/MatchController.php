<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Competition;
use App\Models\MatchGame;
use App\Services\RoundRobinService;
use Illuminate\Http\Request;

class MatchController extends Controller
{
    public function __construct(private RoundRobinService $roundRobin) {}

    public function index(Competition $competition)
    {
        return response()->json(
            $competition->matches()->with(['mandante', 'visitante'])->orderBy('rodada')->get()
        );
    }

    /**
     * Gera automaticamente a tabela de jogos (round robin) a partir das equipes cadastradas.
     */
    public function gerar(Request $request, Competition $competition)
    {
        abort_unless($competition->isAdmin($request->user()->id), 403);

        abort_if($competition->matches()->exists(), 422, 'As partidas já foram geradas para esta competição.');

        $teamIds = $competition->teams()->pluck('id')->all();

        abort_if(count($teamIds) < 2, 422, 'É necessário cadastrar ao menos duas equipes.');
        abort_if(count($teamIds) !== $competition->qtd_equipes, 422, 'Cadastre todas as equipes definidas para a competição antes de gerar a tabela.');

        $confrontos = $this->roundRobin->gerar($teamIds);

        $totalRodadas = max(array_column($confrontos, 'rodada'));
        $datasRodadas = $this->roundRobin->calcularDatasRodadas($competition, $totalRodadas);

        // Modo "por quantidade de rodadas": repete o turno completo até atingir o total pedido
        if ($competition->modo_geracao === 'quantidade_rodadas' && $competition->qtd_rodadas > $totalRodadas) {
            $confrontos = $this->repetirTurnos($confrontos, $competition->qtd_rodadas, $totalRodadas);
            $totalRodadas = $competition->qtd_rodadas;
            $datasRodadas = $this->roundRobin->calcularDatasRodadas($competition, $totalRodadas);
        }

        foreach ($confrontos as $c) {
            MatchGame::create([
                'competition_id' => $competition->id,
                'rodada' => $c['rodada'],
                'data' => $datasRodadas[$c['rodada']] ?? null,
                'mandante_id' => $c['mandante_id'],
                'visitante_id' => $c['visitante_id'],
                'status' => 'agendada',
            ]);
        }

        $competition->update(['status' => 'em_andamento']);

        return response()->json(
            $competition->matches()->with(['mandante', 'visitante'])->orderBy('rodada')->get(),
            201
        );
    }

    public function update(Request $request, Competition $competition, MatchGame $match)
    {
        abort_unless($competition->isAdmin($request->user()->id), 403);

        $data = $request->validate([
            'data' => ['sometimes', 'nullable', 'date'],
            'horario' => ['sometimes', 'nullable', 'string'],
            'local' => ['sometimes', 'nullable', 'string', 'max:120'],
            'status' => ['sometimes', 'in:agendada,em_andamento,finalizada'],
        ]);

        $match->update($data);

        return response()->json($match);
    }

    private function repetirTurnos(array $confrontosBase, int $totalRodadasDesejado, int $rodadasPorTurno): array
    {
        $resultado = $confrontosBase;
        $rodadaAtual = $rodadasPorTurno;

        while (max(array_column($resultado, 'rodada')) < $totalRodadasDesejado) {
            foreach ($confrontosBase as $c) {
                $novaRodada = $rodadaAtual + $c['rodada'];
                if ($novaRodada > $totalRodadasDesejado) {
                    continue;
                }
                // Turno de volta: inverte mando de campo
                $resultado[] = [
                    'rodada' => $novaRodada,
                    'mandante_id' => $c['visitante_id'],
                    'visitante_id' => $c['mandante_id'],
                ];
            }
            $rodadaAtual += $rodadasPorTurno;
        }

        return $resultado;
    }
}
