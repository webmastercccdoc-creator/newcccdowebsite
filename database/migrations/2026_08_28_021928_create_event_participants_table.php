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
        Schema::create('event_participants', function (Blueprint $table) {
            $table->id();
            
            // Foreign key to events table
            $table->foreignId('event_id')
                ->constrained('events')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            
            // Participant details
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('department')->nullable();
            $table->string('phone')->nullable();
            $table->text('notes')->nullable();
            
            // Role and status
            $table->enum('role', ['participant', 'speaker', 'organizer', 'attendee'])
                ->default('participant');
            $table->enum('status', ['registered', 'confirmed', 'attended', 'no_show'])
                ->default('registered');
            
            // Audit fields - who registered/updated this participant
            $table->foreignId('registered_by')
                ->nullable()
                ->constrained('users')
                ->onDelete('set null');
            $table->foreignId('updated_by')
                ->nullable()
                ->constrained('users')
                ->onDelete('set null');
            
            $table->timestamps();
            
            // Indexes for better performance
            $table->index(['event_id', 'status']);
            $table->index(['event_id', 'role']);
            $table->index('email');
            $table->index('department');
            
            // Unique constraint to prevent duplicate emails for the same event
            $table->unique(['event_id', 'email']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_participants');
    }
};