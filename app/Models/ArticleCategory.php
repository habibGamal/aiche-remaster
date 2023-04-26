<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArticleCategory extends Model
{
    use HasFactory;

    public $fillable = [
        'name',
        'cover',
        'type',
        'order'
    ];

    public $timestamps = false;

    public function articles(){
        return $this->hasMany(Article::class,'category_id');
    }

    public function external_articles(){
        return $this->hasMany(ExternalArticle::class,'category_id');
    }
}
