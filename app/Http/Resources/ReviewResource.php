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
            'type' => 'review',
            'id' => $this->id,
            'attributes' => [
                'authorRu' => $this->name_ru,
                'authorEn' => $this->name_en,
                'descriptionRu' => $this->content_ru,
                'descriptionEn' => $this->content_en,
            ],
            'image' => [
                'path' => $this->image->path,
                'tinyPath' => $this->image->tiny_path,
                'altRu' => $this->image->alt_ru,
                'altEn' => $this->image->alt_en,
            ],
        ];
    }
}
