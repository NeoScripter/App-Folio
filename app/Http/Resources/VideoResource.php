<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VideoResource extends JsonResource
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
                'url' => $this->url,
                'title' => [
                    'ru' => $this->title_ru,
                    'en' => $this->title_en,
                ],
            ],
            'image' => when($this->image != null, fn() => [
                'dkAvif' => $this->image->dk_avif,
                'dkWebp' => $this->image->dk_webp,
                'tbAvif' => $this->image->tb_avif,
                'tbWebp' => $this->image->tb_webp,
                'mbAvif' => $this->image->mb_avif,
                'mbWebp' => $this->image->mb_webp,
                'tiny' => $this->image->tiny,
                'alt' => [
                    'ru' => $this->image->alt_ru,
                    'en' => $this->image->alt_en,
                ],
            ]),
        ];
    }
}
