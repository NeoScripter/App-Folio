<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;

class CreateProjectRequest extends FormRequest
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
            'title_en' => 'required|string|max:255',
            'title_ru' => 'required|string|max:255',
            'description_en' => 'required|string',
            'description_ru' => 'required|string',
            'link' => 'nullable|string',
            'order' => 'required|integer',
            'technologies' => 'nullable|array',
            'technologies*' => 'string|min:1',
            'category_en' => 'required|string',
            'category_ru' => 'required|string',
            'mockup' => 'required_with:image|integer|between:1,6',
            'image' => 'nullable|image|max:4048',
            'alt_en' => 'required_with:image|nullable|string|max:255',
            'alt_ru' => 'required_with:image|nullable|string|max:255',
        ];
    }
}
