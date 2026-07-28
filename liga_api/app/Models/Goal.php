<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    protected $table = 'goals';

    protected $fillable = [
        'match_id', 'team_id', 'user_id', 'quantidade',
    ];

    public function match()
    {
        return $this->belongsTo(MatchGame::class, 'match_id');
    }

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
