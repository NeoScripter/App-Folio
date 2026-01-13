<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
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
            'title_en' => 'sometimes|required|string|max:255',
            'title_ru' => 'sometimes|required|string|max:255',
            'description_en' => 'sometimes|required|string',
            'description_ru' => 'sometimes|required|string',
            'link' => 'sometimes|nullable|string',
            'order' => 'sometimes|required|integer',
            'technologies' => 'nullable|array',
            'technologies*' => 'string|min:1',
            'category_en' => 'sometimes|required|string',
            'category_ru' => 'sometimes|required|string',
            'image' => 'sometimes|image|max:4048',
            'mockup' => 'required_with:image|integer|between:1,6',
            'alt_en' => 'required_with:image|nullable|string|max:255',
            'alt_ru' => 'required_with:image|nullable|string|max:255',
        ];
    }
}
