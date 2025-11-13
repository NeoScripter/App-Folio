<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactFormSubmitted extends Notification implements ShouldQueue
{
    use Queueable;

    protected array $contactData;

    /**
     * Create a new notification instance.
     */
    public function __construct(array $contactData)
    {
        $this->contactData = $contactData;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $mail = (new MailMessage)
            ->subject('Новое сообщение с формы контактов / New Contact Form Message')
            ->greeting('Новое сообщение / New Message')
            ->line('**Имя / Name:** ' . $this->contactData['name'])
            ->line('**Email:** ' . $this->contactData['email']);

        if (!empty($this->contactData['telegram'])) {
            $mail->line('**Telegram:** ' . $this->contactData['telegram']);
        }

        if (!empty($this->contactData['whatsapp'])) {
            $mail->line('**WhatsApp:** ' . $this->contactData['whatsapp']);
        }

        $mail->line('**Сообщение / Message:**')
            ->line($this->contactData['message'])
            ->line('---')
            ->line('Отправлено: ' . now()->format('d.m.Y H:i'));

        return $mail;
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return $this->contactData;
    }
}
