<?php

namespace App\Models\Concerns;

trait ConvertsMarkdownToHtml
{
    protected static function bootConvertsMarkdownToHtml(): void
    {
        static::saving(function (self $model) {
            $fields = [
                'body_ru' => 'html_ru',
                'body_en' => 'html_en',
            ];

            foreach ($fields as $markdown => $html) {
                $model->$html = $model->$markdown
                    ? str($model->$markdown)->markdown([
                        'html_input' => 'strip',
                        'allow_unsafe_links' => false,
                        'max_nesting_level' => 5,
                    ])
                    : '';
            }
        });
    }
}
