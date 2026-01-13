<?php

namespace App\Services;

use App\Models\Image;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;

class ImageService
{
    public function sync(
        Model $model,
        ?UploadedFile $file,
        ?string $altRu,
        ?string $altEn,
        ?int $mockup = null
    ): void {
        if ($file) {
            $this->replaceImage($model, $file, $altRu, $altEn, $mockup);
            return;
        }

        if ($model->image && ($altRu || $altEn)) {
            $this->updateAltTexts($model, $altRu, $altEn);
        }
    }

    private function replaceImage(
        Model $model,
        UploadedFile $file,
        ?string $altRu,
        ?string $altEn,
        ?int $mockup
    ): void {
        $model->image?->delete();

        if ($mockup !== null) {
            Image::insertMockupAndAttachTo($model, $file, $altRu, $altEn, $mockup);
        } else {
            Image::attachTo($model, $file, $altRu, $altEn);
        }
    }

    private function updateAltTexts(Model $model, ?string $altRu, ?string $altEn): void
    {
        $updates = array_filter([
            'alt_ru' => $altRu,
            'alt_en' => $altEn,
        ], fn($value) => $value !== null);

        if (!empty($updates)) {
            $model->image?->update($updates);
        }
    }
}
