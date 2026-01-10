<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectModuleResource extends JsonResource
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
                'heading' => [
                    'ru' => $this->title_ru,
                    'en' => $this->title_en,
                ],
                'html' => [
                    'ru' => $this->description_ru,
                    'en' => $this->description_en,
                ],
                'order' => $this->order,
                'type' => $this->type,
            ],
            'firstImage' => $this->when(
                $this->firstImage,
                [
                    'dkAvif' => $this->firstImage->dk_avif,
                    'dkWebp' => $this->firstImage->dk_webp,
                    'tbAvif' => $this->firstImage->tb_avif,
                    'tbWebp' => $this->firstImage->tb_webp,
                    'mbAvif' => $this->firstImage->mb_avif,
                    'mbWebp' => $this->firstImage->mb_webp,
                    'tiny' => $this->firstImage->tiny,
                    'alt' => [
                        'ru' => $this->firstImage->alt_ru,
                        'en' => $this->firstImage->alt_en,
                    ],
                ]
            ),
            'secondImage' => $this->when(
                $this->secondImage,
                [
                    'dkAvif' => $this->secondImage->dk_avif,
                    'dkWebp' => $this->secondImage->dk_webp,
                    'tbAvif' => $this->secondImage->tb_avif,
                    'tbWebp' => $this->secondImage->tb_webp,
                    'mbAvif' => $this->secondImage->mb_avif,
                    'mbWebp' => $this->secondImage->mb_webp,
                    'tiny' => $this->secondImage->tiny,
                    'alt' => [
                        'ru' => $this->secondImage->alt_ru,
                        'en' => $this->secondImage->alt_en,
                    ],
                ]
            ),
        ];
    }
}
