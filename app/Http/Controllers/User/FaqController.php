<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\FaqResource;
use App\Models\Faq;

class FaqController extends Controller
{
    public function index()
    {
        return FaqResource::collection(Faq::all());
    }

    public function show(Faq $faq)
    {
        return new FaqResource($faq);
    }
}
