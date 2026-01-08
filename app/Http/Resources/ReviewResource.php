<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
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
                'author' => [
                    'ru' => $this->name_ru,
                    'en' => $this->name_en,
                ],
                'description' => [
                    'ru' => $this->content_ru,
                    'en' => $this->content_en,
                ],
            ],
            'image' => [
                'path' => $this->image->path,
                'tinyPath' => $this->image->tiny_path,
                'alt' => [
                    'ru' => $this->image->alt_ru,
                    'en' => $this->image->alt_en,
                ],
            ],
        ];
    }
}
