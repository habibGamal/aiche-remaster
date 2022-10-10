<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppConfig extends Model
{
    use HasFactory;
    public $fillable = [
        'name',
        'value'
    ];
    public $timestamps = false;
}
