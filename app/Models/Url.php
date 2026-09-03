<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Url extends Model
{
    protected $fillable = [
        'long_url',
        'short_code',
        'clicks',
    ];

    protected $casts = [
        'clicks' => 'integer',
    ];
}