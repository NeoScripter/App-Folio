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
