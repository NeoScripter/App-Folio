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
            'type' => 'faq',
            'id' => $this->id,
            'attributes' => [
                'titleRu' => $this->title_ru,
                'titleEn' => $this->title_en,
                'descriptionRu' => $this->content_ru,
                'descriptionEn' => $this->content_en,
            ],
        ];
    }
}
