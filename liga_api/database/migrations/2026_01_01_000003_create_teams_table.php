<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('competition_id')->constrained()->cascadeOnDelete();
            $table->string('nome');
            $table->string('escudo')->nullable();
            $table->string('cor_principal')->nullable();
            $table->string('cor_secundaria')->nullable();
            $table->timestamps();
        });

        Schema::table('competitions', function (Blueprint $table) {
            $table->foreign('campeao_equipe_id')->references('id')->on('teams')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('competitions', function (Blueprint $table) {
            $table->dropForeign(['campeao_equipe_id']);
        });
        Schema::dropIfExists('teams');
    }
};
