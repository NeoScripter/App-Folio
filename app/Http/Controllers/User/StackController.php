<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\StackResource;
use App\Models\Stack;

class StackController extends Controller
{
    public function index()
    {
        return StackResource::collection(Stack::all());
    }
}
