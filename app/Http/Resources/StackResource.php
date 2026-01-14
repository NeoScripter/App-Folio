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
            'id' => $this->id,
            'attributes' => [
                'image' => $this->image,
                'html' => [
                    'ru' => $this->html_ru,
                    'en' => $this->html_en,
                ],
                'body' => $this->when(
                    $request->routeIs('stacks.show'),
                    fn() => [
                        'ru' => $this->body_ru,
                        'en' => $this->body_en,
                    ],
                ),
                'alt' => [
                    'ru' => $this->alt_ru,
                    'en' => $this->alt_en,
                ]
            ]
        ];
    }
}
