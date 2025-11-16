<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StackResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'type' => 'stack',
            'id' => $this->id,
            'attributes' => [
                'image' => $this->image,
                'htmlRu' => $this->html_ru,
                'htmlEn' => $this->html_en,
            ],
        ];
    }
}
