<?php

namespace App\Services;

use App\Models\Competition;
use Carbon\Carbon;

class RoundRobinService
{
    /**
     * Gera as partidas de pontos corridos via algoritmo round robin (círculo).
     * Requer número par de equipes (regra da V1).
     *
     * @param  array<int>  $teamIds  IDs das equipes, na ordem de sorteio
     * @return array Lista de partidas: [rodada, mandante_id, visitante_id]
     */
    public function gerar(array $teamIds): array
    {
        $times = $teamIds;
        $n = count($times);

        if ($n % 2 !== 0) {
            throw new \InvalidArgumentException('A V1 do Liga+ exige número par de equipes.');
        }

        $totalRodadas = $n - 1;
        $partidas = [];
        $fixo = array_shift($times); // primeira equipe fica fixa, o resto gira

        for ($rodada = 1; $rodada <= $totalRodadas; $rodada++) {
            $confrontos = [];

            // Confronto da equipe fixa contra a primeira do array rotativo
            $adversario = $times[0];
            // Alterna mando de campo a cada rodada para equilibrar jogos em casa/fora
            $confrontos[] = ($rodada % 2 === 1)
                ? [$fixo, $adversario]
                : [$adversario, $fixo];

            // Confrontos das demais equipes (pareadas do início e fim do array rotativo)
            for ($i = 1; $i < $n / 2; $i++) {
                $mandante = $times[$i];
                $visitante = $times[$n - 1 - $i];
                $confrontos[] = [$mandante, $visitante];
            }

            foreach ($confrontos as $c) {
                $partidas[] = [
                    'rodada' => $rodada,
                    'mandante_id' => $c[0],
                    'visitante_id' => $c[1],
                ];
            }

            // Rotaciona o array (mantendo o primeiro elemento fixo fora da rotação)
            array_unshift($times, array_pop($times));
        }

        return $partidas;
    }

    /**
     * Calcula as datas de cada rodada conforme o modo escolhido pelo organizador.
     *
     * @return array<int, Carbon> rodada => data
     */
    public function calcularDatasRodadas(Competition $competition, int $totalRodadas): array
    {
        $datas = [];

        if ($competition->modo_geracao === 'quantidade_rodadas') {
            // Sem período definido: apenas numera as rodadas, sem data fixa.
            for ($r = 1; $r <= $totalRodadas; $r++) {
                $datas[$r] = null;
            }

            return $datas;
        }

        // Modo "por período": distribui as rodadas conforme a frequência informada
        $data = Carbon::parse($competition->rodadas_data_inicial);
        $fim = Carbon::parse($competition->rodadas_data_final);
        $intervaloDias = $this->intervaloEmDias($competition->frequencia);

        for ($r = 1; $r <= $totalRodadas; $r++) {
            if ($data->gt($fim)) {
                $datas[$r] = null; // ultrapassou o período informado

                continue;
            }
            $datas[$r] = $data->copy();
            $data->addDays($intervaloDias);
        }

        return $datas;
    }

    private function intervaloEmDias(?string $frequencia): int
    {
        return match ($frequencia) {
            'terca', 'sabado', 'domingo', 'segunda', 'quarta', 'quinta', 'sexta' => 7,
            'a_cada_8_dias' => 8,
            default => 7,
        };
    }
}
