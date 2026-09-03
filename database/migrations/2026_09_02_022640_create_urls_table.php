<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('urls', function (Blueprint $table) {
            $table->id();
            $table->text('long_url');
            $table->string('short_code', 100)->unique()->index();
            $table->integer('clicks')->default(0);
            $table->timestamps();
            
            // Fix: Add index with key length for TEXT column
            $table->index(['long_url' => 255]); // Use first 255 characters for index
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('urls');
    }
};