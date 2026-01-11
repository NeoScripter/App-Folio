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

        $dkWebp = $manager->read($file)->scaleDown(width: 1900)->toWebp(80);
        $tbWebp = $manager->read($file)->scaleDown(width: 1100)->toWebp(80);
        $mbWebp = $manager->read($file)->scaleDown(width: 500)->toWebp(80);
        $dkAvif = $manager->read($file)->scaleDown(width: 1900)->toAvif(50);
        $tbAvif = $manager->read($file)->scaleDown(width: 1100)->toAvif(50);
        $mbAvif = $manager->read($file)->scaleDown(width: 500)->toAvif(50);
        $tiny     = $manager->read($file)->scaleDown(width: 20)->toWebp(80);

        $dkWebpPath = "uploads/{$filename}-dk.webp";
        $dkAvifPath = "uploads/{$filename}-dk.avif";
        $tbWebpPath = "uploads/{$filename}-tb.webp";
        $tbAvifPath = "uploads/{$filename}-tb.avif";
        $mbWebpPath = "uploads/{$filename}-mb.webp";
        $mbAvifPath = "uploads/{$filename}-mb.avif";
        $tinyPath     = "uploads/{$filename}-tiny.webp";

        Storage::disk('public')->makeDirectory('uploads');

        Storage::disk('public')->put($dkWebpPath, (string) $dkWebp);
        Storage::disk('public')->put($dkAvifPath, (string) $dkAvif);
        Storage::disk('public')->put($tbWebpPath, (string) $tbWebp);
        Storage::disk('public')->put($tbAvifPath, (string) $tbAvif);
        Storage::disk('public')->put($mbWebpPath, (string) $mbWebp);
        Storage::disk('public')->put($mbAvifPath, (string) $mbAvif);
        Storage::disk('public')->put($tinyPath, (string) $tiny);

        return [
            'dkWebp' => $dkWebpPath,
            'tbWebp' => $tbWebpPath,
            'mbWebp' => $mbWebpPath,
            'dkAvif' => $dkAvifPath,
            'tbAvif' => $tbAvifPath,
            'mbAvif' => $mbAvifPath,
            'tiny' => $tinyPath,
        ];
    }
}
