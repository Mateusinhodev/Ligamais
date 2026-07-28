<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CompetitionController;
use App\Http\Controllers\Api\MatchController;
use App\Http\Controllers\Api\ParticipantController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ResultController;
use App\Http\Controllers\Api\ScorerController;
use App\Http\Controllers\Api\StandingController;
use App\Http\Controllers\Api\TeamController;
use Illuminate\Support\Facades\Route;

// --- Autenticação (pública) ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

// --- Rotas autenticadas (Sanctum) ---
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Perfil
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);

    // Competições
    Route::get('/competitions', [CompetitionController::class, 'index']);
    Route::post('/competitions', [CompetitionController::class, 'store']);
    Route::get('/competitions/{competition}', [CompetitionController::class, 'show']);
    Route::put('/competitions/{competition}', [CompetitionController::class, 'update']);
    Route::post('/competitions/{competition}/encerrar', [CompetitionController::class, 'encerrar']);
    Route::get('/competitions/{competition}/convite', [CompetitionController::class, 'convite']);

    // Equipes
    Route::get('/competitions/{competition}/teams', [TeamController::class, 'index']);
    Route::post('/competitions/{competition}/teams', [TeamController::class, 'store']);
    Route::put('/competitions/{competition}/teams/{team}', [TeamController::class, 'update']);

    // Participantes
    Route::get('/competitions/{competition}/participants', [ParticipantController::class, 'index']);
    Route::post('/participants/join', [ParticipantController::class, 'join']);
    Route::post('/competitions/{competition}/participants/{participant}/aprovar', [ParticipantController::class, 'aprovar']);
    Route::post('/competitions/{competition}/participants/{participant}/rejeitar', [ParticipantController::class, 'rejeitar']);
    Route::post('/competitions/{competition}/participants/{participant}/promover', [ParticipantController::class, 'promoverAdmin']);

    // Partidas
    Route::get('/competitions/{competition}/matches', [MatchController::class, 'index']);
    Route::post('/competitions/{competition}/matches/gerar', [MatchController::class, 'gerar']);
    Route::put('/competitions/{competition}/matches/{match}', [MatchController::class, 'update']);

    // Resultados
    Route::post('/competitions/{competition}/matches/{match}/resultado', [ResultController::class, 'store']);

    // Estatísticas
    Route::get('/competitions/{competition}/classificacao', [StandingController::class, 'index']);
    Route::get('/competitions/{competition}/artilharia', [ScorerController::class, 'index']);
});
