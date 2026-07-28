<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreResultRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'placar_mandante' => ['required', 'integer', 'min:0'],
            'placar_visitante' => ['required', 'integer', 'min:0'],
            'gols' => ['sometimes', 'array'],
            'gols.*.user_id' => ['required_with:gols', 'integer', 'exists:users,id'],
            'gols.*.team_id' => ['required_with:gols', 'integer', 'exists:teams,id'],
            'gols.*.quantidade' => ['required_with:gols', 'integer', 'min:1'],
        ];
    }
}
