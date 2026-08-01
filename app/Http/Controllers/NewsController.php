<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index()
    {
        return Inertia::render('content/News');
    }

    public function show($id)
    {
        return Inertia::render('content/News', ['id' => $id]);
    }
}
