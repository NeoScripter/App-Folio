<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Technology;

class TechnologyController extends Controller
{
    //
    public function index()
    {
        return Technology::select('name')
            ->distinct()
            ->get()
            ->toResourceCollection();
    }
}
