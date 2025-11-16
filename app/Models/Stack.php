<?php

namespace App\Models;

use App\Models\Concerns\ConvertsMarkdownToHtml;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Stack extends Model
{
    /** @use HasFactory<\Database\Factories\StackFactory> */
    use HasFactory, ConvertsMarkdownToHtml;

    public function getImageAttribute(): string
    {
        return Storage::disk('public')->url($this->attributes['image']);
    }
}
