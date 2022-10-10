<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;
    public $fillable = [
        'name',
        'position',
        'facebook',
        'linkedin',
        'profile',
        'in'
    ];
    public $timestamps = false;
}
