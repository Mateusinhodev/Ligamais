<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('competitions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('created_by')->constrained('users');
            $table->string('nome');
            $table->text('descricao')->nullable();
            $table->string('imagem')->nullable();
            $table->date('data_inicial');
            $table->date('data_final');
            $table->string('formato')->default('pontos_corridos');
            $table->unsignedTinyInteger('qtd_equipes');

            // Configuração da geração de rodadas
            $table->enum('modo_geracao', ['periodo', 'quantidade_rodadas'])->nullable();
            $table->date('rodadas_data_inicial')->nullable();
            $table->date('rodadas_data_final')->nullable();
            $table->string('frequencia')->nullable(); // ex: "terca", "sabado", "a_cada_8_dias"
            $table->unsignedSmallInteger('qtd_rodadas')->nullable();

            // Convite
            $table->string('codigo_convite', 10)->unique();

            $table->enum('status', ['aberta', 'em_andamento', 'encerrada'])->default('aberta');
            $table->foreignId('campeao_equipe_id')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('competitions');
    }
};
