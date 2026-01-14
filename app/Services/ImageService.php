<?php
namespace App\Services;

use App\Models\Image;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;

class ImageService
{
    /**
     * Sync a single image for a model relationship.
     */
    public function sync(
        Model $model,
        ?UploadedFile $file,
        ?string $altRu,
        ?string $altEn,
        ?int $mockup = null,
        string $relationship = 'image'
    ): void {
        if ($file) {
            $this->replaceImage($model, $file, $altRu, $altEn, $mockup, $relationship);
            return;
        }

        $this->updateAltTextsIfNeeded($model, $altRu, $altEn, $relationship);
    }

    public function syncMultiple(Model $model, array $images): void
    {
        foreach ($images as $relationship => $imageData) {
            $this->sync(
                $model,
                $imageData['file'] ?? null,
                $imageData['alt_ru'] ?? null,
                $imageData['alt_en'] ?? null,
                $imageData['mockup'] ?? null,
                $relationship
            );
        }
    }

    private function replaceImage(
        Model $model,
        UploadedFile $file,
        ?string $altRu,
        ?string $altEn,
        ?int $mockup,
        string $relationship
    ): void {
        // Delete existing image
        $model->{$relationship}?->delete();

        // Attach new image based on relationship type
        $this->attachImage($model, $file, $altRu, $altEn, $mockup, $relationship);
    }

    private function attachImage(
        Model $model,
        UploadedFile $file,
        ?string $altRu,
        ?string $altEn,
        ?int $mockup,
        string $relationship
    ): void {
        if ($mockup !== null) {
            Image::insertMockupAndAttachTo(
                $model,
                $file,
                $altRu,
                $altEn,
                $mockup,
                $this->getImageType($relationship)
            );
        } else {
            Image::attachTo(
                $model,
                $file,
                $altRu,
                $altEn,
                $this->getImageType($relationship)
            );
        }
    }

    private function updateAltTextsIfNeeded(
        Model $model,
        ?string $altRu,
        ?string $altEn,
        string $relationship
    ): void {
        $image = $model->{$relationship};

        if (!$image || (!$altRu && !$altEn)) {
            return;
        }

        $updates = array_filter([
            'alt_ru' => $altRu,
            'alt_en' => $altEn,
        ], fn($value) => $value !== null);

        if (!empty($updates)) {
            $image->update($updates);
        }
    }

    /**
     * Map relationship names to image types.
     * This helps differentiate between first_image and second_image.
     */
    private function getImageType(string $relationship): ?string
    {
        return match ($relationship) {
            'first_image' => 'first',
            'second_image' => 'second',
            default => 'image',
        };
    }
}
