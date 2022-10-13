<?php

namespace App\Http\Controllers;

use App\Models\ArticleCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ArticleCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('ArticlesCategories/Index', ['articleCategoriesDB' => ArticleCategory::all()]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('ArticlesCategories/Editor');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'cover' => 'required|image',
            'type' => ['required', Rule::in(['external_articles', 'articles'])]
        ]);
        $coverPath = saveImageAndGetPath($request->cover);
        ArticleCategory::create([
            'name' => $request->name,
            'cover' => $coverPath,
            'type' => $request->type
        ]);
        return Redirect::route('article-categories.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ArticleCategory  $articleCategory
     * @return \Illuminate\Http\RedirectResponse
     */
    public function show(ArticleCategory $articleCategory)
    {
        if ($articleCategory->type == 'external_articles')
            return Redirect::route('external-articles.index', [$articleCategory->id]);
        else {
            return Redirect::route('articles.index', [$articleCategory->id]);
        }
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ArticleCategory  $articleCategory
     * @return \Inertia\Response
     */
    public function edit(ArticleCategory $articleCategory)
    {
        return Inertia::render('ArticlesCategories/Editor', [
            'articleCategoryDB' => $articleCategory
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ArticleCategory  $articleCategory
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, ArticleCategory $articleCategory)
    {
        $request->validate([
            'name' => 'required|string',
            'cover' => 'required|image',
            'type' => ['required', Rule::in(['external_articles', 'articles'])]
        ]);
        if ($request->hasFile('cover')) {
            $coverPath = saveImageAndGetPath($request->cover);
            deleteImage($articleCategory->cover);
            $articleCategory->cover = $coverPath;
        }
        $articleCategory->name;
        $articleCategory->type;
        $articleCategory->save();
        return Redirect::route('article-categories.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ArticleCategory  $articleCategory
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(ArticleCategory $articleCategory)
    {
        deleteImage($articleCategory->cover);
        $articleCategory->delete();
        return Redirect::route('article-categories.index');
    }
}
