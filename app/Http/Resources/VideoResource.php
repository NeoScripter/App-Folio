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
            'type' => 'video',
            'id' => $this->id,
            'attributes' => [
                'url' => $this->url,
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
