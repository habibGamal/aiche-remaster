<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExternalArticle extends Model
{
    use HasFactory;

    public $fillable = [
        'title',
        'link',
        'cover',
        'category_id',
        'order'
    ];

    public $timestamps = false;

    public function category()
    {
        return $this->belongsTo(ArticleCategory::class, 'category_id');
    }
}
