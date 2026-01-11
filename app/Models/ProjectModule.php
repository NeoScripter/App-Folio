<?php

namespace App\Models;

use App\Enums\ProjectModuleType;
use App\Models\Concerns\ConvertsMarkdownToHtml;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class ProjectModule extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectModuleFactory> */
    use HasFactory, ConvertsMarkdownToHtml;

    protected $casts = [
        'type' => ProjectModuleType::class,
    ];
    protected $with = ['first_image', 'second_image'];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function first_image(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable')->oldestOfMany();
    }

    public function second_image(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable')->latestOfMany();
    }
}
