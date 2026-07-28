<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Competition;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index(Competition $competition)
    {
        return response()->json($competition->teams);
    }

    public function store(Request $request, Competition $competition)
    {
        abort_unless($competition->isAdmin($request->user()->id), 403, 'Apenas administradores podem cadastrar equipes.');

        abort_if(
            $competition->teams()->count() >= $competition->qtd_equipes,
            422,
            'Número máximo de equipes já foi atingido para esta competição.'
        );

        $data = $request->validate([
            'nome' => ['required', 'string', 'max:80'],
            'escudo' => ['nullable', 'string'],
            'cor_principal' => ['nullable', 'string', 'max:20'],
            'cor_secundaria' => ['nullable', 'string', 'max:20'],
        ]);

        $team = $competition->teams()->create($data);

        return response()->json($team, 201);
    }

    public function update(Request $request, Competition $competition, \App\Models\Team $team)
    {
        abort_unless($competition->isAdmin($request->user()->id), 403);

        $data = $request->validate([
            'nome' => ['sometimes', 'string', 'max:80'],
            'escudo' => ['sometimes', 'nullable', 'string'],
            'cor_principal' => ['sometimes', 'nullable', 'string', 'max:20'],
            'cor_secundaria' => ['sometimes', 'nullable', 'string', 'max:20'],
        ]);

        $team->update($data);

        return response()->json($team);
    }
}
