<?php

namespace App\Services;

use App\Models\Competition;

class StandingsService
{
    /**
     * Monta a tabela de classificação com os critérios de desempate:
     * 1. Pontos; 2. Saldo de gols; 3. Gols pró; 4. Confronto direto.
     */
    public function classificacao(Competition $competition): array
    {
        $times = $competition->teams()->get();
        $partidasFinalizadas = $competition->matches()
            ->where('status', 'finalizada')
            ->get();

        $tabela = [];

        foreach ($times as $time) {
            $tabela[$time->id] = [
                'equipe_id' => $time->id,
                'equipe' => $time->nome,
                'jogos' => 0,
                'vitorias' => 0,
                'empates' => 0,
                'derrotas' => 0,
                'gols_pro' => 0,
                'gols_contra' => 0,
                'saldo_gols' => 0,
                'pontos' => 0,
            ];
        }

        foreach ($partidasFinalizadas as $partida) {
            $this->aplicarResultado($tabela, $partida->mandante_id, $partida->placar_mandante, $partida->placar_visitante);
            $this->aplicarResultado($tabela, $partida->visitante_id, $partida->placar_visitante, $partida->placar_mandante);
        }

        $linhas = array_values($tabela);

        usort($linhas, function ($a, $b) use ($partidasFinalizadas) {
            if ($a['pontos'] !== $b['pontos']) {
                return $b['pontos'] <=> $a['pontos'];
            }
            if ($a['saldo_gols'] !== $b['saldo_gols']) {
                return $b['saldo_gols'] <=> $a['saldo_gols'];
            }
            if ($a['gols_pro'] !== $b['gols_pro']) {
                return $b['gols_pro'] <=> $a['gols_pro'];
            }

            // Critério 4: confronto direto
            return $this->confrontoDireto($partidasFinalizadas, $a['equipe_id'], $b['equipe_id']);
        });

        foreach ($linhas as $i => &$linha) {
            $linha['posicao'] = $i + 1;
        }

        return $linhas;
    }

    private function aplicarResultado(array &$tabela, int $equipeId, ?int $golsPro, ?int $golsContra): void
    {
        if (! isset($tabela[$equipeId]) || $golsPro === null || $golsContra === null) {
            return;
        }

        $tabela[$equipeId]['jogos']++;
        $tabela[$equipeId]['gols_pro'] += $golsPro;
        $tabela[$equipeId]['gols_contra'] += $golsContra;
        $tabela[$equipeId]['saldo_gols'] += ($golsPro - $golsContra);

        if ($golsPro > $golsContra) {
            $tabela[$equipeId]['vitorias']++;
            $tabela[$equipeId]['pontos'] += 3;
        } elseif ($golsPro === $golsContra) {
            $tabela[$equipeId]['empates']++;
            $tabela[$equipeId]['pontos'] += 1;
        } else {
            $tabela[$equipeId]['derrotas']++;
        }
    }

    private function confrontoDireto($partidas, int $equipeA, int $equipeB): int
    {
        $saldoA = 0;

        foreach ($partidas as $p) {
            if ($p->mandante_id === $equipeA && $p->visitante_id === $equipeB) {
                $saldoA += ($p->placar_mandante - $p->placar_visitante);
            } elseif ($p->mandante_id === $equipeB && $p->visitante_id === $equipeA) {
                $saldoA += ($p->placar_visitante - $p->placar_mandante);
            }
        }

        return $saldoA === 0 ? 0 : ($saldoA > 0 ? -1 : 1);
    }

    /**
     * Ranking de artilharia: 1. gols; 2. média de gols; 3. ordem alfabética.
     */
    public function artilharia(Competition $competition): array
    {
        $golsPorJogador = [];

        $gols = \App\Models\Goal::whereHas('match', function ($q) use ($competition) {
            $q->where('competition_id', $competition->id)->where('status', 'finalizada');
        })->with(['user', 'team'])->get();

        foreach ($gols as $gol) {
            $uid = $gol->user_id;
            if (! isset($golsPorJogador[$uid])) {
                $golsPorJogador[$uid] = [
                    'jogador' => $gol->user->name,
                    'equipe' => $gol->team->nome,
                    'gols' => 0,
                    'jogos' => 0,
                    'partidas_ids' => [],
                ];
            }
            $golsPorJogador[$uid]['gols'] += $gol->quantidade;
            $golsPorJogador[$uid]['partidas_ids'][$gol->match_id] = true;
        }

        foreach ($golsPorJogador as &$linha) {
            $linha['jogos'] = count($linha['partidas_ids']);
            $linha['media_gols'] = $linha['jogos'] > 0
                ? round($linha['gols'] / $linha['jogos'], 2)
                : 0;
            unset($linha['partidas_ids']);
        }

        $ranking = array_values($golsPorJogador);

        usort($ranking, function ($a, $b) {
            if ($a['gols'] !== $b['gols']) {
                return $b['gols'] <=> $a['gols'];
            }
            if ($a['media_gols'] !== $b['media_gols']) {
                return $b['media_gols'] <=> $a['media_gols'];
            }

            return strcmp($a['jogador'], $b['jogador']);
        });

        foreach ($ranking as $i => &$linha) {
            $linha['posicao'] = $i + 1;
        }

        return $ranking;
    }
}
