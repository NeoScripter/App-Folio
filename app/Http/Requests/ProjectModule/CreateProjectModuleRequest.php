<?php

namespace App\Http\Requests\ProjectModule;

use App\Enums\ProjectModuleType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class CreateProjectModuleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type' => ['required', new Enum(ProjectModuleType::class)],

            'title_en' => 'required|string|max:255',
            'title_ru' => 'required|string|max:255',
            'description_en' => 'required|string',
            'description_ru' => 'required|string',
            'link' => 'nullable|string',
            'order' => 'required|integer',

            'technologies' => 'nullable|array',
            'technologies.*' => 'string|min:1',

            'first_image' => 'nullable|image|max:4048',
            'first_alt_en' => 'required_with:first_image|nullable|string|max:255',
            'first_alt_ru' => 'required_with:first_image|nullable|string|max:255',

            'second_image' => 'nullable|image|max:4048',
            'second_alt_en' => 'required_with:second_image|nullable|string|max:255',
            'second_alt_ru' => 'required_with:second_image|nullable|string|max:255',
        ];
    }
}

