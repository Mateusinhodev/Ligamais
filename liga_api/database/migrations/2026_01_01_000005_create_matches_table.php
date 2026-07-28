<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('competition_id')->constrained()->cascadeOnDelete();
            $table->unsignedSmallInteger('rodada');
            $table->date('data')->nullable();
            $table->time('horario')->nullable();
            $table->string('local')->nullable();
            $table->foreignId('mandante_id')->constrained('teams');
            $table->foreignId('visitante_id')->constrained('teams');
            $table->unsignedSmallInteger('placar_mandante')->nullable();
            $table->unsignedSmallInteger('placar_visitante')->nullable();
            $table->enum('status', ['agendada', 'em_andamento', 'finalizada', 'pendente_validacao'])->default('agendada');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
