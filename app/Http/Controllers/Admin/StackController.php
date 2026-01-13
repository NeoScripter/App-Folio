<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Stack;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;

class StackController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'body_en' => 'required|string',
            'body_ru' => 'required|string',
            'image' => 'required|image|max:4048',
            'alt_en' => 'required|string|max:255',
            'alt_ru' => 'required|string|max:255',
        ]);

        $stackData = Arr::except($validated, ['image']);

        if ($request->hasFile('image')) {
            $stackData['image'] = $request->file('image')->store('stacks', 'public');
        }

        $stack = Stack::create($stackData);

        return response()->json([
            'message' => 'Stack created successfully',
            'data' => $stack
        ], 201);
    }

    public function update(Request $request, Stack $stack)
    {
        $validated = $request->validate([
            'body_en' => 'sometimes|required|string',
            'body_ru' => 'sometimes|required|string',
            'image' => 'sometimes|image|max:4048',
            'alt_en' => 'sometimes|required|string|max:255',
            'alt_ru' => 'sometimes|required|string|max:255',
        ]);

        $stackData = Arr::except($validated, ['image']);

        if ($request->hasFile('image')) {
            if ($stack->image) {
                Storage::disk('public')->delete($stack->attributes['image']);
            }
            $stackData['image'] = $request->file('image')->store('stacks', 'public');
        }

        $stack->update($stackData);

        return response()->json([
            'message' => 'Stack updated successfully',
            'data' => $stack
        ]);
    }

    public function destroy(Stack $stack)
    {
        if ($stack->image) {
            Storage::disk('public')->delete($stack->image);
        }

        $stack->delete();

        return response()->json([
            'message' => 'Stack deleted successfully'
        ]);
    }
}
