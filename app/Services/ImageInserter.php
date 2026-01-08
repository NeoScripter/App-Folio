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

// Command for the first mockup:

// convert mockup-1.webp \
// \( result.png -virtual-pixel none +distort perspective \
// "0,0 272,286   965,0 1240,288   965,707 1264,967   0,707 298,1017" \) \
// -layers merge +repage output.png

// Command for the second mockup:
// convert mockup-2.webp \
// \( result.png -virtual-pixel none +distort perspective \
// "0,0 365,136   965,0 1368,134   965,707 1238,857   0,707 250,932" \) \
// -layers merge +repage output.png

// Command for the third mockup:
// convert mockup-3.webp \
// \( result.png -virtual-pixel none +distort perspective \
// "0,0 789,61   965,0 1809,459   965,707 1571,1220   0,707 602,780" \) \
// -layers merge +repage output.png

// Command for the fourth mockup:
// convert mockup-4.webp \
// \( result.png -virtual-pixel none +distort perspective \
// "0,0 314,206   965,0 1502,136   965,707 1472,937   0,707 320,1076" \) \
// -layers merge +repage output.png

// Command for the fifth mockup:
// convert mockup-5.webp \
// \( result.webp -virtual-pixel none +distort perspective \
// "0,0 653,288   965,0 1806,235   965,707 1779,1170   0,707 618,1135" \) \
// -layers merge +repage output.webp

// image 621 width 854 height
// Command for the sixth mockup:
// convert mockup-6.webp \
// \( cropped.webp -virtual-pixel none +distort perspective \
// "0,0 392,435   621,0 971,166   621,854 1462,975   0,854 872,1282" \) \
// -layers merge +repage output.webp
