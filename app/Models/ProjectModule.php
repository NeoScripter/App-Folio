<?php

namespace App\Models;

use App\Enums\ProjectModuleType;
use App\Models\Concerns\ConvertsMarkdownToHtml;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class ProjectModule extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectModuleFactory> */
    use HasFactory, ConvertsMarkdownToHtml;

    protected $casts = [
        'type' => ProjectModuleType::class,
    ];
    protected $with = ['firstImage', 'secondImage'];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function firstImage(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable')
            ->where('type', 'first');
    }

    public function secondImage(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable')
            ->where('type', 'second');
    }
}
