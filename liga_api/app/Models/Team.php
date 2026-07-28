<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = [
        'competition_id', 'nome', 'escudo', 'cor_principal', 'cor_secundaria',
    ];

    public function competition()
    {
        return $this->belongsTo(Competition::class);
    }

    public function participants()
    {
        return $this->hasMany(Participant::class);
    }

    public function mandanteMatches()
    {
        return $this->hasMany(MatchGame::class, 'mandante_id');
    }

    public function visitanteMatches()
    {
        return $this->hasMany(MatchGame::class, 'visitante_id');
    }

    public function goals()
    {
        return $this->hasMany(Goal::class);
    }
}
