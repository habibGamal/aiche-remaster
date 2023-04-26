<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    public $fillable = [
        'title',
        'cover',
        'description',
        'content',
        'category_id',
        'order'
    ];

    public function category()
    {
        return $this->belongsTo(ArticleCategory::class, 'category_id');
    }
}
