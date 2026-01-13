<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Stack\CreateStackRequest;
use App\Http\Requests\Stack\UpdateStackRequest;
use App\Models\Stack;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;

class StackController extends Controller
{
    public function store(CreateStackRequest $request)
    {
        $request->validated();

        $stackData = $request->safe()->except(['image']);

        if ($request->hasFile('image')) {
            $stackData['image'] = $request->file('image')->store('stacks', 'public');
        }

        $stack = Stack::create($stackData);

        return response()->json([
            'message' => 'Stack created successfully',
            'data' => $stack
        ], 201);
    }

    public function update(UpdateStackRequest $request, Stack $stack)
    {
        $request->validated();

        $stackData = $request->safe()->except(['image']);

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
