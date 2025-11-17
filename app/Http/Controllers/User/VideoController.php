<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\VideoResource;
use App\Models\Video;

class VideoController extends Controller
{
    public function index()
    {
        return VideoResource::collection(Video::all());
    }
}
