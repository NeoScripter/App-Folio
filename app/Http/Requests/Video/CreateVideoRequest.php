<?php

namespace App\Http\Requests\Video;

use Illuminate\Foundation\Http\FormRequest;

class CreateVideoRequest extends FormRequest
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
            'title_en' => 'required|string',
            'title_ru' => 'required|string',
            'url' => 'required|string',
            'image' => 'nullable|image|max:4048',
            'alt_en' => 'required|string|max:255',
            'alt_ru' => 'required|string|max:255',
        ];
    }
}
