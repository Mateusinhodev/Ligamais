<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('foto')->nullable()->after('email');
            $table->string('apelido')->nullable()->after('foto');
            $table->string('cidade')->nullable()->after('apelido');
            $table->string('posicao')->nullable()->after('cidade');
            $table->unsignedSmallInteger('numero_camisa')->nullable()->after('posicao');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['foto', 'apelido', 'cidade', 'posicao', 'numero_camisa']);
        });
    }
};
