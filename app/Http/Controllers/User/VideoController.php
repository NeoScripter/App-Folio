<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\VideoResource;
use App\Models\Video;

class VideoController extends Controller
{
    public function index()
    {
        $query = Video::query();
        if (request()->filled('latest')) {
            $query->latest();
        }
        return VideoResource::collection($query->get());
    }

    public function show(Video $video)
    {
        return new VideoResource($video);
    }
}
