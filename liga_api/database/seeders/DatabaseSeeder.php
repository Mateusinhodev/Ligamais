<?php

namespace Database\Seeders;

use App\Models\Competition;
use App\Models\Participant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $organizador = User::factory()->create([
            'name' => 'Organizador Grupo 50+',
            'email' => 'organizador@ligaplus.test',
            'password' => 'senha1234',
        ]);

        $competition = Competition::create([
            'created_by' => $organizador->id,
            'nome' => '50+ Guaraí 2026',
            'descricao' => 'Competição anual do grupo 50+ de Guaraí.',
            'data_inicial' => '2026-01-01',
            'data_final' => '2026-12-15',
            'qtd_equipes' => 2,
            'modo_geracao' => 'quantidade_rodadas',
            'qtd_rodadas' => 20,
            'codigo_convite' => strtoupper(Str::random(6)),
            'status' => 'aberta',
        ]);

        Participant::create([
            'competition_id' => $competition->id,
            'user_id' => $organizador->id,
            'status' => 'aprovado',
            'is_admin' => true,
        ]);

        $azul = $competition->teams()->create(['nome' => 'Azul', 'cor_principal' => '#0057B7']);
        $competition->teams()->create(['nome' => 'Vermelho', 'cor_principal' => '#D32F2F']);
    }
}
