<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Competition extends Model
{
    protected $fillable = [
        'created_by', 'nome', 'descricao', 'imagem', 'data_inicial', 'data_final',
        'formato', 'qtd_equipes', 'modo_geracao', 'rodadas_data_inicial',
        'rodadas_data_final', 'frequencia', 'qtd_rodadas', 'codigo_convite',
        'status', 'campeao_equipe_id',
    ];

    protected function casts(): array
    {
        return [
            'data_inicial' => 'date',
            'data_final' => 'date',
            'rodadas_data_inicial' => 'date',
            'rodadas_data_final' => 'date',
        ];
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function teams()
    {
        return $this->hasMany(Team::class);
    }

    public function participants()
    {
        return $this->hasMany(Participant::class);
    }

    public function matches()
    {
        return $this->hasMany(MatchGame::class);
    }

    public function isAdmin(int $userId): bool
    {
        if ($this->created_by === $userId) {
            return true;
        }

        return $this->participants()
            ->where('user_id', $userId)
            ->where('is_admin', true)
            ->where('status', 'aprovado')
            ->exists();
    }
}
