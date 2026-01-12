<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\StackResource;
use App\Models\Stack;

class StackController extends Controller
{
    public function index()
    {
        $query = Stack::query();
        if (request()->filled('latest')) {
            $query->latest();
        }
        return StackResource::collection($query->get());
    }

    public function show(Stack $stack)
    {
        return new StackResource($stack);
    }
}
