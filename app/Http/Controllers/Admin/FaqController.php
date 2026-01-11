<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_en' => 'required|string|max:255',
            'title_ru' => 'required|string|max:255',
            'content_en' => 'required|string',
            'content_ru' => 'required|string',
        ]);

        $faq = Faq::create($validated);

        return response()->json([
            'message' => 'FAQ created successfully',
            'data' => $faq
        ], 201);
    }

    public function update(Request $request, Faq $faq)
    {
        $validated = $request->validate([
            'title_en' => 'sometimes|required|string|max:255',
            'title_ru' => 'sometimes|required|string|max:255',
            'content_en' => 'sometimes|required|string',
            'content_ru' => 'sometimes|required|string',
        ]);

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
