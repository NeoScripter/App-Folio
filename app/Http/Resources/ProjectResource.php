<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'type' => 'project',
            'id' => $this->id,
            'attributes' => [
                'titleRu' => $this->title_ru,
                'titleEn' => $this->title_en,
                'descriptionRu' => $this->description_ru,
                'descriptionEn' => $this->description_en,
                'link' => $this->link,
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
