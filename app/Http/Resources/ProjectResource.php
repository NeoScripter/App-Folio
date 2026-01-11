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
            'id' => $this->id,
            'attributes' => [
                'title' => [
                    'ru' => $this->title_ru,
                    'en' => $this->title_en,
                ],
                'description' => [
                    'ru' => $this->description_ru,
                    'en' => $this->description_en,
                ],
                'category' => [
                    'ru' => $this->category->name_ru,
                    'en' => $this->category->name_en,
                ],
                'stacks' => [
                    'ru' => $this->technologies->pluck('name_ru')->toArray(),
                    'en' => $this->technologies->pluck('name_en')->toArray(),
                ],
                'slug' => $this->slug,
                'link' => $this->link,
                'url' => url('/portfolio/' . $this->slug),
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
            'links' => [
                ['self' => route('projects.show', ['project' => $this->slug])]
            ],
            'modules' => $this->when(
                $request->routeIs('projects.show'),
                ProjectModuleResource::collection($this->modules)
            ),
        ];
    }
}
