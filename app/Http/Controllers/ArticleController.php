<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Models\Article;
use App\Models\ArticleCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     */
    public function index(ArticleCategory $category)
    {
        return Inertia::render('Articles/Index', [
            'articlesDB' =>
            $category
                ->articles()
                ->select(['id', 'title', 'cover', 'description', 'category_id'])
                ->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Articles/Editor', [
            'categories' => ArticleCategory::where('type','articles')->select(['id', 'name'])->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreArticleRequest $request)
    {
        $validated = $request->validated();
        $image = $validated['cover'];
        $path = saveImageAndGetPath($image);
        Article::create([
            'title' => $validated['title'],
            'cover' => $path,
            'description' => $validated['description'],
            'content' => $validated['content'],
            'category_id' => $validated['category'],
        ]);
        return Redirect::route('articles.index', ['category' => $validated['category']]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Inertia\Response
     */
    public function show(Article $article)
    {
        return Inertia::render('Articles/Single', ['articleDB' => $article]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Inertia\Response
     */
    public function edit(Article $article)
    {
        return Inertia::render('Articles/Editor', [
            'articleDB' => $article,
            'categories' => ArticleCategory::where('type','articles')->select(['id', 'name'])->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateArticleRequest $request, Article $article)
    {
        $validated = $request->validated();
        // validate if that image changed or not
        // if changed
        if (isset($validated['cover'])) {
            // delete old image
            deleteImage($article->cover);
            // save new one
            $article->cover = saveImageAndGetPath($validated['cover']);
        }
        // update other fields
        $article->title = $validated['title'];
        $article->description = $validated['description'];
        $article->content = $validated['content'];
        $article->category_id = $validated['category'];
        $article->save();
        // return to index page
        return Redirect::route('articles.index',['category'=>$validated['category']]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Article $article)
    {
        $article->delete();
        return Redirect::route('articles.index', ['category' => $article->category_id]);
    }
}
