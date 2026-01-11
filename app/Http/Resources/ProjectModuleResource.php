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
                $this->first_image != null,
                fn() => [
                    'dkAvif' => $this->first_image->dk_avif,
                    'dkWebp' => $this->first_image->dk_webp,
                    'tbAvif' => $this->first_image->tb_avif,
                    'tbWebp' => $this->first_image->tb_webp,
                    'mbAvif' => $this->first_image->mb_avif,
                    'mbWebp' => $this->first_image->mb_webp,
                    'tiny' => $this->first_image->tiny,
                    'alt' => [
                        'ru' => $this->first_image->alt_ru,
                        'en' => $this->first_image->alt_en,
                    ],
                ]
            ),
            'secondImage' => $this->when(
                $this->second_image != null,
                fn() => [
                    'dkAvif' => $this->second_image->dk_avif,
                    'dkWebp' => $this->second_image->dk_webp,
                    'tbAvif' => $this->second_image->tb_avif,
                    'tbWebp' => $this->second_image->tb_webp,
                    'mbAvif' => $this->second_image->mb_avif,
                    'mbWebp' => $this->second_image->mb_webp,
                    'tiny' => $this->second_image->tiny,
                    'alt' => [
                        'ru' => $this->second_image->alt_ru,
                        'en' => $this->second_image->alt_en,
                    ],
                ]
            ),
        ];
    }
}
