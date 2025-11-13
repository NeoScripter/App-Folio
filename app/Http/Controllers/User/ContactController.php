<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\ContactFormRequest;
use App\Notifications\ContactFormSubmitted;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Notification;

class ContactController extends Controller
{
    /**
     * Handle contact form submission.
     */
    public function store(ContactFormRequest $request): JsonResponse
    {
        try {
            $validated = $request->validated();

            Notification::route('mail', config('mail.admin_email'))
                ->notify(new ContactFormSubmitted($validated));

            Log::info('Contact form submitted', [
                'name' => $validated['name'],
                'email' => $validated['email'],
            ]);

            return response()->json([
                'message' => $this->getSuccessMessage($request),
                'data' => [
                    'submitted_at' => now()->toIso8601String(),
                ],
            ], 200);
        } catch (\Exception $e) {
            Log::error('Contact form submission failed', [
                'error' => $e->getMessage(),
                'data' => $request->all(),
            ]);

            return response()->json([
                'message' => $this->getErrorMessage($request),
            ], 500);
        }
    }

    /**
     * Get success message based on locale.
     */
    private function getSuccessMessage($request): string
    {
        $locale = $request->header('Accept-Language', 'en');
        $isRussian = str_starts_with($locale, 'ru');

        return $isRussian
            ? 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.'
            : 'Thank you for your message! We will contact you soon.';
    }

    /**
     * Get error message based on locale.
     */
    private function getErrorMessage($request): string
    {
        $locale = $request->header('Accept-Language', 'en');
        $isRussian = str_starts_with($locale, 'ru');

        return $isRussian
            ? 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.'
            : 'An error occurred while sending your message. Please try again later.';
    }
}
