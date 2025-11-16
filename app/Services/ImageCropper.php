<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Imagick\Driver;
use Illuminate\Support\Str;

class ImageCropper
{
    public function handleImage(UploadedFile $file, string $type = 'vertical'): array
    {
        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $filename = Str::slug($originalName) . '-' . uniqid();

        $manager = new ImageManager(new Driver());

        // Target sizes for both modes
        $sizes = match ($type) {
            'vertical' => ['w' => 621, 'h' => 854],
            'horizontal' => ['w' => 965, 'h' => 707],
            default => throw new \InvalidArgumentException('Invalid crop type'),
        };

        $image = $manager->read($file);

        // 1. Scale proportionally to the required width (never exceed original)
        $image->scaleDown(width: $sizes['w']);

        // 2. Crop required height from the top (offset_y = 0)
        $image->crop(
            width: $sizes['w'],
            height: $sizes['h'],
            offset_x: 0,
            offset_y: 0
        );

        // Save as WebP
        $path = "uploads/{$filename}-{$type}.webp";

        Storage::disk('public')->makeDirectory('uploads');
        Storage::disk('public')->put($path, (string) $image->toWebp(100));

        return [
            'path' => $path,
        ];
    }
}
