<?php

namespace App\Http\Filters;

class ProjectFilter extends QueryFilter {

    public function limit($value) {
        return $this->builder->limit((int) $value);
    }
}
