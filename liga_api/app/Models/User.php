<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name', 'email', 'password',
        'foto', 'apelido', 'cidade', 'posicao', 'numero_camisa',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function participations()
    {
        return $this->hasMany(Participant::class);
    }

    public function goals()
    {
        return $this->hasMany(Goal::class);
    }

    public function competitionsCreated()
    {
        return $this->hasMany(Competition::class, 'created_by');
    }

    /**
     * Histórico esportivo: competições disputadas + resultado (campeão/vice/participante).
     */
    public function historico(): array
    {
        $participacoes = $this->participations()
            ->where('status', 'aprovado')
            ->with('competition')
            ->get();

        return $participacoes->map(function (Participant $p) {
            $comp = $p->competition;
            $resultado = 'Participante';

            if ($comp->status === 'encerrada' && $comp->campeao_equipe_id) {
                if ($comp->campeao_equipe_id === $p->team_id) {
                    $resultado = 'Campeão';
                }
            }

            return [
                'competicao' => $comp->nome,
                'ano' => $comp->data_inicial->format('Y'),
                'resultado' => $resultado,
            ];
        })->toArray();
    }
}
