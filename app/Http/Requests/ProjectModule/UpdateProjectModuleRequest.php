<?php

namespace App\Http\Requests\ProjectModule;

use App\Enums\ProjectModuleType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateProjectModuleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type' => ['sometimes', 'required', new Enum(ProjectModuleType::class)],

            'title_en' => 'sometimes|required|string|max:255',
            'title_ru' => 'sometimes|required|string|max:255',
            'description_en' => 'sometimes|required|string',
            'description_ru' => 'sometimes|required|string',
            'link' => 'sometimes|nullable|string',
            'order' => 'sometimes|required|integer',

            'technologies' => 'nullable|array',
            'technologies.*' => 'string|min:1',

            'first_image' => 'sometimes|image|max:4048',
            'first_alt_en' => 'required_with:first_image|nullable|string|max:255',
            'first_alt_ru' => 'required_with:first_image|nullable|string|max:255',

            'second_image' => 'sometimes|image|max:4048',
            'second_alt_en' => 'required_with:second_image|nullable|string|max:255',
            'second_alt_ru' => 'required_with:second_image|nullable|string|max:255',
        ];
    }
}
