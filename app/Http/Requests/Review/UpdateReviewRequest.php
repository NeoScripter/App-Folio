<?php

namespace App\Http\Requests\Review;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReviewRequest extends FormRequest
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
            'name_en' => 'sometimes|required|string|max:255',
            'name_ru' => 'sometimes|required|string|max:255',
            'content_en' => 'sometimes|required|string',
            'content_ru' => 'sometimes|required|string',
            'image' => 'sometimes|image|max:4048',
            'alt_en' => 'sometimes|required|string|max:255',
            'alt_ru' => 'sometimes|required|string|max:255',
        ];
    }
}
