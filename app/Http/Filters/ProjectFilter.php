<?php

namespace App\Http\Filters;

class ProjectFilter extends QueryFilter
{
    public function search($value)
    {
        $this->builder->where(function ($q) use ($value) {
            $q->where('title_ru', 'LIKE', "%{$value}%")
                ->orWhere('title_en', 'LIKE', "%{$value}%")
                ->orWhere('description_en', 'LIKE', "%{$value}%")
                ->orWhere('description_ru', 'LIKE', "%{$value}%");
        });
    }

    public function latest($value)
    {
        if ($value) {
            $this->builder->latest();
        }
    }

    public function limit($value)
    {
        $this->builder->limit((int) $value);
    }

    public function exclude($value)
    {
        $this->builder->where('id', '!=', (int) $value);
    }

    public function category($value)
    {
        $this->builder->whereHas('category', function ($q) use ($value) {
            $q->where('slug', $value);
        });
    }

    public function technology($value)
    {
        $this->builder->whereHas('technologies', function ($q) use ($value) {
            $q->where('slug', $value);
        });
    }
}
