<?php

namespace App\Support;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use SplFileInfo;

class StackFixtures
{
    public static function getFixtures(): Collection
    {
        return once(function () {
            return collect(File::files(database_path('factories/fixtures/stacks')))
                ->map(fn(SplFileInfo $fileInfo) => $fileInfo->getContents()) // get full content
                ->map(fn(string $contents) => [
                    'body' => trim($contents),
                ]);
        });
    }
}
