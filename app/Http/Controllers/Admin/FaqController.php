<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Faq\CreateFaqRequest;
use App\Http\Requests\Faq\UpdateFaqRequest;
use App\Models\Faq;

class FaqController extends Controller
{
    public function store(CreateFaqRequest $request)
    {
        $validated = $request->validated();

        $faq = Faq::create($validated);

        return response()->json([
            'message' => 'FAQ created successfully',
            'data' => $faq
        ], 201);
    }

    public function update(UpdateFaqRequest $request, Faq $faq)
    {
        $validated = $request->validated();

        $faq->update($validated);

        return response()->json([
            'message' => 'FAQ updated successfully',
            'data' => $faq
        ]);
    }

    public function destroy(Faq $faq)
    {
        $faq->delete();

        return response()->json([
            'message' => 'FAQ deleted successfully'
        ]);
    }
}
