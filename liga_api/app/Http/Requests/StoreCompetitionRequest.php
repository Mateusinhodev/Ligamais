<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCompetitionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nome' => ['required', 'string', 'max:120'],
            'descricao' => ['nullable', 'string'],
            'imagem' => ['nullable', 'string'],
            'data_inicial' => ['required', 'date'],
            'data_final' => ['required', 'date', 'after_or_equal:data_inicial'],
            'qtd_equipes' => ['required', 'integer', Rule::in([2, 4, 6, 8, 10, 12])],

            'modo_geracao' => ['required', Rule::in(['periodo', 'quantidade_rodadas'])],
            'rodadas_data_inicial' => ['required_if:modo_geracao,periodo', 'nullable', 'date'],
            'rodadas_data_final' => ['required_if:modo_geracao,periodo', 'nullable', 'date', 'after_or_equal:rodadas_data_inicial'],
            'frequencia' => ['required_if:modo_geracao,periodo', 'nullable', 'string'],
            'qtd_rodadas' => ['required_if:modo_geracao,quantidade_rodadas', 'nullable', 'integer', 'min:1'],
        ];
    }

    public function messages(): array
    {
        return [
            'qtd_equipes.in' => 'A V1 do Liga+ aceita apenas números pares de equipes (2, 4, 6, 8, 10 ou 12).',
        ];
    }
}
