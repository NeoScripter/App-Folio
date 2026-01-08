<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FaqResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'attributes' => [
                'title' => [
                    'ru' => $this->title_ru,
                    'en' => $this->title_en,
                ],
                'description' => [
                    'ru' => $this->content_ru,
                    'en' => $this->content_en,
                ],
            ],
        ];
    }
}
