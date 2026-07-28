<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Competition;
use App\Models\Participant;
use Illuminate\Http\Request;

class ParticipantController extends Controller
{
    public function index(Competition $competition)
    {
        return response()->json(
            $competition->participants()->with(['user', 'team'])->get()
        );
    }

    /**
     * Jogador entra na competição usando o código de convite e escolhe equipe.
     */
    public function join(Request $request)
    {
        $data = $request->validate([
            'codigo' => ['required', 'string'],
            'team_id' => ['required', 'integer', 'exists:teams,id'],
        ]);

        $competition = Competition::where('codigo_convite', strtoupper($data['codigo']))->firstOrFail();

        abort_unless(
            $competition->teams()->where('id', $data['team_id'])->exists(),
            422,
            'Essa equipe não pertence a esta competição.'
        );

        $participant = Participant::firstOrCreate(
            ['competition_id' => $competition->id, 'user_id' => $request->user()->id],
            ['team_id' => $data['team_id'], 'status' => 'pendente']
        );

        return response()->json($participant->load('team'), 201);
    }

    public function aprovar(Request $request, Competition $competition, Participant $participant)
    {
        abort_unless($competition->isAdmin($request->user()->id), 403);

        $participant->update(['status' => 'aprovado']);

        return response()->json($participant);
    }

    public function rejeitar(Request $request, Competition $competition, Participant $participant)
    {
        abort_unless($competition->isAdmin($request->user()->id), 403);

        $participant->update(['status' => 'rejeitado']);

        return response()->json($participant);
    }

    public function promoverAdmin(Request $request, Competition $competition, Participant $participant)
    {
        abort_unless($competition->isAdmin($request->user()->id), 403);

        $participant->update(['is_admin' => true]);

        return response()->json($participant);
    }
}
