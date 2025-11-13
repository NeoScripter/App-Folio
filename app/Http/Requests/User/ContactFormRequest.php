<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class ContactFormRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:254'],
            'telegram' => ['nullable', 'string', 'max:300'],
            'whatsapp' => ['nullable', 'string', 'max:300'],
            'message' => ['required', 'string', 'max:2000'],
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        $locale = $this->header('Accept-Language', 'en');
        $isRussian = str_starts_with($locale, 'ru');

        if ($isRussian) {
            return [
                'name.required' => 'Имя обязательно',
                'name.max' => 'Имя не должно превышать 100 символов',
                'email.required' => 'Email обязателен',
                'email.email' => 'Пожалуйста, введите действительный email',
                'email.max' => 'Email не должен превышать 254 символа',
                'telegram.max' => 'Имя пользователя Telegram не должно превышать 300 символов',
                'whatsapp.max' => 'Номер WhatsApp не должен превышать 300 символов',
                'message.required' => 'Сообщение обязательно',
                'message.max' => 'Сообщение не должно превышать 2000 символов',
            ];
        }

        return [
            'name.required' => 'Name is required',
            'name.max' => 'Name must not exceed 100 characters',
            'email.required' => 'Email is required',
            'email.email' => 'Please enter a valid email address',
            'email.max' => 'Email must not exceed 254 characters',
            'telegram.max' => 'Telegram username must not exceed 300 characters',
            'whatsapp.max' => 'WhatsApp number must not exceed 300 characters',
            'message.required' => 'Message is required',
            'message.max' => 'Message must not exceed 2000 characters',
        ];
    }
}
