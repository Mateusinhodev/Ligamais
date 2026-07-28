<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Competition;
use App\Services\StandingsService;

class ScorerController extends Controller
{
    public function __construct(private StandingsService $standings) {}

    public function index(Competition $competition)
    {
        return response()->json($this->standings->artilharia($competition));
    }
}
