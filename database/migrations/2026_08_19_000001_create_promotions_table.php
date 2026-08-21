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
        Schema::create('promotions', function (Blueprint $table) {
            $table->id();
            
            // Basic information
            $table->string('title');
            $table->text('content');
            
            // Image fields
            $table->string('image_path')->nullable();
            $table->string('image_alt_text')->nullable();
            
            // Date fields
            $table->date('date');
            $table->date('expire');
            
            // Status field
            $table->enum('status', ['active', 'inactive', 'expired'])->default('inactive');
            
            // Additional fields
            $table->string('link')->nullable();
            $table->string('department')->nullable();
            
            // Audit fields
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('created_by')
                  ->references('id')
                  ->on('users')
                  ->onDelete('set null');

            $table->foreign('updated_by')
                  ->references('id')
                  ->on('users')
                  ->onDelete('set null');

            // Indexes for better performance
            $table->index('status');
            $table->index('date');
            $table->index('expire');
            $table->index(['status', 'date']);
            $table->index(['status', 'expire']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotions');
    }
};