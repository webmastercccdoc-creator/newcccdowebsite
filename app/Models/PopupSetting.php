<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PopupSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'enabled',
        'title',
        'caption',
        'link_url',
        'image_path',
    ];

    protected $casts = [
        'enabled' => 'boolean',
    ];

    /**
     * Get the singleton popup settings row (creates one if missing).
     */
    public static function current(): self
    {
        return static::query()->firstOrCreate([], [
            'enabled' => true,
        ]);
    }

    /**
     * Full public URL for the stored image.
     */
    public function getImageUrlAttribute(): ?string
    {
        if (! $this->image_path) {
            return null;
        }

        // If already a full URL, return as-is.
        if (preg_match('/^https?:\/\//i', $this->image_path)) {
            return $this->image_path;
        }

        return asset('storage/' . ltrim($this->image_path, '/'));
    }

    /**
     * Convenience array for the API / Inertia props.
     */
    public function toClientArray(): array
    {
        return [
            'enabled'   => $this->enabled,
            'title'     => $this->title,
            'caption'   => $this->caption,
            'link_url'  => $this->link_url,
            'image_url' => $this->image_url,
        ];
    }
}