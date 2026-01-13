<?php

namespace App\Http\Requests\Stack;

use Illuminate\Foundation\Http\FormRequest;

class CreateStackRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'body_en' => 'required|string',
            'body_ru' => 'required|string',
            'image' => 'required|image|max:4048',
            'alt_en' => 'required|string|max:255',
            'alt_ru' => 'required|string|max:255',
        ];
    }
}
