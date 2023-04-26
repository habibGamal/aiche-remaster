<?php

namespace App\Http\Controllers;

use App\Models\ArticleCategory;
use App\Models\ExternalArticle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ExternalArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index(ArticleCategory $category)
    {
        return Inertia::render('ExternalArticles/Index', [
            'externalArticlesDB' => $category->external_articles()->select(['*'])->orderBy('order')->get(),
            'categoryDB' => $category
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('ExternalArticles/Editor', [
            'categories' => ArticleCategory::where('type', 'external_articles')->select(['id', 'name'])->get(),
        ]);
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
            'title' => 'required|string',
            'link' => 'required|string',
            'cover' => 'nullable|image',
            'category' => 'required|integer',
        ]);
        $cover = null;
        if ($request->hasFile('cover'))
            $cover = saveImageAndGetPath($request->cover);
        ExternalArticle::create([
            'title' => $request->title,
            'link' => $request->link,
            'cover' => $cover,
            'category_id' => $request->category,
            'order' => $request->order,
        ]);
        return Redirect::route('external-articles.index', ['category' => $request->category]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ExternalArticle  $externalArticle
     * @return \Inertia\Response
     */
    public function edit(ExternalArticle $externalArticle)
    {
        return Inertia::render('ExternalArticles/Editor', [
            'externalArticleDB' => $externalArticle,
            'categories' => ArticleCategory::where('type', 'external_articles')->select(['id', 'name'])->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ExternalArticle  $externalArticle
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, ExternalArticle $externalArticle)
    {
        $request->validate([
            'title' => 'required|string',
            'link' => 'required|string',
            'cover' => 'nullable|image',
            'category' => 'required|integer',
        ]);
        if ($request->hasFile('cover')) {
            if ($externalArticle->cover)
                deleteImage($externalArticle->cover);
            $externalArticle->cover = saveImageAndGetPath($request->cover);
        }
        $externalArticle->title = $request->title;
        $externalArticle->link = $request->link;
        $externalArticle->category_id = $request->category;
        $externalArticle->order = $request->order;
        $externalArticle->save();
        return Redirect::route('external-articles.index', ['category' => $request->category]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ExternalArticle  $externalArticle
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(ExternalArticle $externalArticle)
    {
        $category = $externalArticle->category_id;
        $externalArticle->delete();
        return Redirect::route('external-articles.index', ['category' => $category]);
    }
}
