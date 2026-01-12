<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\FaqResource;
use App\Models\Faq;

class FaqController extends Controller
{
    public function index()
    {
        $query = Faq::query();
        if (request()->filled('latest')) {
            $query->latest();
        }
        return FaqResource::collection($query->get());
    }

    public function show(Faq $faq)
    {
        return new FaqResource($faq);
    }
}
