<?php

namespace App\Models;

use App\Services\ImageInserter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class Image extends Model
{
    /** @use HasFactory<\Database\Factories\ImageFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    public function imageable(): MorphTo
    {
        return $this->morphTo();
    }

    public function getPathAttribute(): string
    {
        return Storage::disk('public')->url($this->attributes['path']);
    }

    public function getPreviewPathAttribute(): string
    {
        return Storage::disk('public')->url($this->attributes['preview_path']);
    }

    public function getTinyPathAttribute(): string
    {
        return Storage::disk('public')->url($this->attributes['tiny_path']);
    }

    private static function processAndAttach(
        Model $model,
        UploadedFile|string $file,
        string $altRu,
        string $altEn
    ): self {
        if (is_string($file)) {
            $absolute = Storage::disk('public')->path($file);

            $file = new UploadedFile(
                $absolute,
                basename($absolute),
                'image/webp',
                null,
                true
            );
        }

        $paths = app(\App\Services\ImageResizer::class)->handleImage($file);

        $image = new static([
            'alt_ru'        => $altRu,
            'alt_en'        => $altEn,
            'path'          => $paths['original'],
            'preview_path'  => $paths['preview'],
            'tiny_path'     => $paths['tiny'],
        ]);

        $model->image()->save($image);

        return $image;
    }

    public static function insertMockupAndAttachTo(
        Model $model,
        UploadedFile $file,
        string $altRu,
        string $altEn,
        int $mockupNumber
    ): self {
        $inserted = app(ImageInserter::class)->handle($file, $mockupNumber);

        return static::processAndAttach($model, $inserted, $altRu, $altEn);
    }

    public static function attachTo(
        Model $model,
        UploadedFile $file,
        string $altRu,
        string $altEn
    ): self {
        return static::processAndAttach($model, $file, $altRu, $altEn);
    }

    protected static function booted(): void
    {
        static::deleting(function (Image $image) {
            Storage::disk('public')->delete([
                $image->getRawOriginal('path'),
                $image->getRawOriginal('preview_path'),
                $image->getRawOriginal('tiny_path'),
            ]);
        });
    }
}
