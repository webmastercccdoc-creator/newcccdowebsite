<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsArticle extends Model
{
    use HasFactory;

    protected $table = 'news_articles';

    protected $fillable = [
        'title',
        'content',
        'date',
        'status',
        'department',
        'created_by',
        'approved_by',
        'image',
        'alt_text',
    ];

    protected $casts = [
        'date' => 'date',
    ];
}
