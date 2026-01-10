<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->string('dk_webp');
            $table->string('dk_avif')->nullable();
            $table->string('tb_webp');
            $table->string('tb_avif')->nullable();
            $table->string('mb_webp');
            $table->string('mb_avif')->nullable();
            $table->string('tiny');
            $table->text('alt_ru');
            $table->text('alt_en');
            $table->morphs('imageable');
            $table->string('type')->default('image');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};
