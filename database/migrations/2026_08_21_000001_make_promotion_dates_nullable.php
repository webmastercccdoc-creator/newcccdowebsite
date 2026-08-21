<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('promotions', function (Blueprint $table) {
            $table->date('date')->nullable()->change();
            $table->date('expire')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('promotions', function (Blueprint $table) {
            $table->date('date')->nullable(false)->change();
            $table->date('expire')->nullable(false)->change();
        });
    }
};
