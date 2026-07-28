<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MatchGame extends Model
{
    protected $table = 'matches';

    protected $fillable = [
        'competition_id', 'rodada', 'data', 'horario', 'local',
        'mandante_id', 'visitante_id', 'placar_mandante', 'placar_visitante', 'status',
    ];

    protected function casts(): array
    {
        return [
            'data' => 'date',
        ];
    }

    public function competition()
    {
        return $this->belongsTo(Competition::class);
    }

    public function mandante()
    {
        return $this->belongsTo(Team::class, 'mandante_id');
    }

    public function visitante()
    {
        return $this->belongsTo(Team::class, 'visitante_id');
    }

    public function goals()
    {
        return $this->hasMany(Goal::class, 'match_id');
    }
}
