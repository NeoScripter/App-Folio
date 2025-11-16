<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Symfony\Component\Process\Process;
use Illuminate\Support\Facades\Storage;

class ImageInserter
{
    public function __construct(
        private ImageCropper $cropper
    ) {}

    public function handle(UploadedFile $filePath, int $mockupNumber): string
    {
        if ($mockupNumber < 1 || $mockupNumber > 6) {
            throw new \InvalidArgumentException('Mockup must be between 1 and 6.');
        }

        // 1) Crop first
        $mode = $mockupNumber <= 5 ? 'horizontal' : 'vertical';

        $cropped = $this->cropper->handleImage(
            $filePath,
            $mode
        );

        $croppedPath = Storage::disk('public')->path($cropped['path']);

        // 2) Pick mockup file
        $mockup = Storage::disk('public')
            ->path("models/mockups/mockup-{$mockupNumber}.webp");

        // 3) Output file
        $filename = 'mockup-' . $mockupNumber . '-' . uniqid() . '.webp';
        $outputPath = Storage::disk('public')->path("uploads/{$filename}");

        Storage::disk('public')->makeDirectory('uploads');

        // 4) Command depending on orientation
        if ($mode === 'vertical') {
            $coords = '"0,0 392,435   621,0 971,166   621,854 1462,975   0,854 872,1282"';
            $cmd = [
                'convert',
                $mockup,
                '(',
                $croppedPath,
                '-virtual-pixel',
                'none',
                '+distort',
                'perspective',
                $coords,
                ')',
                '-layers',
                'merge',
                '+repage',
                $outputPath,
            ];
        } else {
            $coords = '"0,0 653,288   965,0 1806,235   965,707 1779,1170   0,707 618,1135"';
            $cmd = [
                'convert',
                $mockup,
                '(',
                $croppedPath,
                '-virtual-pixel',
                'none',
                '+distort',
                'perspective',
                $coords,
                ')',
                '-layers',
                'merge',
                '+repage',
                $outputPath,
            ];
        }

        // 5) Run convert
        $process = new Process($cmd);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new \RuntimeException('ImageMagick failed: ' . $process->getErrorOutput());
        }

        // 6) Return public-relative path
        return "uploads/{$filename}";
    }
}
