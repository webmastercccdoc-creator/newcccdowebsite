<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description'
    ];

    protected $table = 'departments';

    public function articles()
    {
        return $this->hasMany(Article::class);
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}