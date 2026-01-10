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

    public function getDkWebpAttribute(): string
    {
        return Storage::disk('public')->url($this->attributes['dk_webp']);
    }

    public function getTbWebpAttribute(): string
    {
        return Storage::disk('public')->url($this->attributes['tb_webp']);
    }

    public function getMbWebpAttribute(): string
    {
        return Storage::disk('public')->url($this->attributes['mb_webp']);
    }
    public function getDkAvifAttribute(): string
    {
        return Storage::disk('public')->url($this->attributes['dk_avif']);
    }

    public function getTbAvifAttribute(): string
    {
        return Storage::disk('public')->url($this->attributes['tb_avif']);
    }

    public function getMbAvifAttribute(): string
    {
        return Storage::disk('public')->url($this->attributes['mb_avif']);
    }

    public function getTinyAttribute(): string
    {
        return Storage::disk('public')->url($this->attributes['tiny']);
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
            'alt_ru' => $altRu,
            'alt_en' => $altEn,
            'dk_webp' => $paths['dkWebp'],
            'tb_webp' => $paths['tbWebp'],
            'mb_webp' => $paths['mbWebp'],
            'dk_avif' => $paths['dkAvif'],
            'tb_avif' => $paths['tbAvif'],
            'mb_avif' => $paths['mbAvif'],
            'tiny'  => $paths['tiny'],
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
                $image->getRawOriginal('dk_webp'),
                $image->getRawOriginal('dk_avif'),
                $image->getRawOriginal('tb_webp'),
                $image->getRawOriginal('tb_avif'),
                $image->getRawOriginal('mb_webp'),
                $image->getRawOriginal('mb_avif'),
                $image->getRawOriginal('tiny'),
            ]);
        });
    }
}
