<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Imagick\Driver;
use Illuminate\Support\Str;

class ImageResizer
{
    public function handleImage(UploadedFile $file): array
    {
        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $filename = Str::slug($originalName) . '-' . uniqid();

        $manager = new ImageManager(new Driver());

        $desktop = $manager->read($file)->scaleDown(width: 1900)->toWebp(80);
        $tablet = $manager->read($file)->scaleDown(width: 1100)->toWebp(80);
        $mobile = $manager->read($file)->scaleDown(width: 500)->toWebp(80);
        $tiny     = $manager->read($file)->scaleDown(width: 20)->toWebp(80);

        $desktopPath = "uploads/{$filename}-dk.webp";
        $tabletPath = "uploads/{$filename}-tb.webp";
        $mobilePath     = "uploads/{$filename}-mb.webp";
        $tinyPath     = "uploads/{$filename}-tiny.webp";

        Storage::disk('public')->makeDirectory('uploads');

        Storage::disk('public')->put($desktopPath, (string) $desktop);
        Storage::disk('public')->put($tabletPath, (string) $tablet);
        Storage::disk('public')->put($mobilePath, (string) $mobile);
        Storage::disk('public')->put($tinyPath, (string) $tiny);

        return [
            'desktop' => $desktopPath,
            'tablet' => $tabletPath,
            'mobile'     => $mobilePath,
            'tiny'     => $tinyPath,
        ];
    }
}
