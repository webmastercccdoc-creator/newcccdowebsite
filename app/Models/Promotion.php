<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Promotion extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'image_path',
        'image_alt_text',
        'date',
        'expire',
        'status',
        'link',
        'department',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'date' => 'date',
        'expire' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Status constants
    const STATUS_ACTIVE = 'active';
    const STATUS_INACTIVE = 'inactive';
    const STATUS_EXPIRED = 'expired';

    // Get all available statuses
    public static function getStatuses()
    {
        return [
            self::STATUS_ACTIVE => 'Active',
            self::STATUS_INACTIVE => 'Inactive',
            self::STATUS_EXPIRED => 'Expired',
        ];
    }

    // Get status badge color
    public static function getStatusBadgeColor($status)
    {
        return [
            self::STATUS_ACTIVE => 'bg-emerald-100 text-emerald-700 border-emerald-200',
            self::STATUS_INACTIVE => 'bg-gray-100 text-gray-700 border-gray-200',
            self::STATUS_EXPIRED => 'bg-red-100 text-red-700 border-red-200',
        ][$status] ?? 'bg-gray-100 text-gray-700 border-gray-200';
    }

    // Get status label
    public static function getStatusLabel($status)
    {
        return self::getStatuses()[$status] ?? ucfirst($status);
    }

    // Get status icon
    public static function getStatusIcon($status)
    {
        $icons = [
            'active' => 'check-circle',
            'inactive' => 'minus-circle',
            'expired' => 'x-circle',
        ];
        return $icons[$status] ?? 'circle';
    }

    // Accessor for image URL
    public function getImageUrlAttribute()
    {
        if ($this->image_path) {
            // Check if it's a full URL
            if (filter_var($this->image_path, FILTER_VALIDATE_URL)) {
                return $this->image_path;
            }
            // Otherwise, serve from storage
            return asset('storage/' . $this->image_path);
        }
        return null;
    }

    // Check if promotion is active and not expired
    public function isActive()
    {
        return $this->status === self::STATUS_ACTIVE
            && ($this->expire === null || $this->expire->gte(Carbon::today()));
    }

    // Check if promotion is expired
    public function isExpired()
    {
        return $this->status === self::STATUS_EXPIRED
            || ($this->expire !== null && $this->expire->lt(Carbon::today()));
    }

    // Check if promotion is inactive
    public function isInactive()
    {
        return $this->status === self::STATUS_INACTIVE;
    }

    // Scope for active promotions
    public function scopeActive($query)
    {
        return $query->where('status', self::STATUS_ACTIVE)
                     ->where(function ($query) {
                         $query->whereNull('expire')
                               ->orWhere('expire', '>=', Carbon::today());
                     });
    }

    // Scope for inactive promotions
    public function scopeInactive($query)
    {
        return $query->where('status', self::STATUS_INACTIVE);
    }

    // Scope for expired promotions
    public function scopeExpired($query)
    {
        return $query->where('expire', '<', Carbon::now())
                     ->orWhere('status', self::STATUS_EXPIRED);
    }

    // Scope for upcoming promotions (not expired and active)
    public function scopeUpcoming($query)
    {
        return $query->whereNotNull('date')
                     ->where('date', '>=', Carbon::today())
                     ->where('status', self::STATUS_ACTIVE);
    }

    // Scope for promotions by department
    public function scopeByDepartment($query, $department)
    {
        return $query->where('department', $department);
    }

    // Relationship with user who created
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Relationship with user who updated
    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    // Auto-update status based on dates
    public static function boot()
    {
        parent::boot();

        static::saving(function ($promotion) {
            // If status is active but expired, mark as expired
            if ($promotion->status === self::STATUS_ACTIVE
                && $promotion->expire !== null
                && $promotion->expire->lt(Carbon::today())) {
                $promotion->status = self::STATUS_EXPIRED;
            }
        });

        static::retrieved(function ($promotion) {
            // Auto-update status when retrieving if expired
            if ($promotion->status === self::STATUS_ACTIVE
                && $promotion->expire !== null
                && $promotion->expire->lt(Carbon::today())) {
                $promotion->status = self::STATUS_EXPIRED;
                $promotion->save();
            }
        });
    }
}