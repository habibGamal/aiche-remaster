<?php

use App\Http\Controllers\AppConfigController;
use App\Http\Controllers\ArticleCategoryController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommitteController;
use App\Http\Controllers\EventImagesController;
use App\Http\Controllers\ExternalArticleController;
use App\Http\Controllers\MemberController;
use App\Models\AppConfig;
use App\Models\Committe;
use App\Models\EventImages;
use App\Models\Member;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/login', function (){
    return Inertia::render('Login');
});
Route::post('/login', [AuthController::class, 'authenticate']);

Route::get('/', function () {
    return Inertia::render('Home', [
        'committesDB' => Committe::all(),
        'presidentPhotoDB' => AppConfig::where('name','president_photo')->first(),
        'sliderPhotosDB' => AppConfig::where('name', 'slider_photos')->first(),
        'eventImagesDB' => EventImages::all(),
    ]);
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About', ['membersDB' => Member::all()]);
})->name('about');

Route::get('articles/category/{category}', [ArticleController::class, 'index'])->name('articles.index');
Route::get('external-articles/category/{category}', [ExternalArticleController::class, 'index'])->name('external-articles.index');

Route::resource('articles', ArticleController::class)->except('index');
Route::resource('external-articles', ExternalArticleController::class)->except(['index','show']);
Route::resource('article-categories', ArticleCategoryController::class);
Route::resource('members', MemberController::class)->except(['show']);
Route::resource('committes', CommitteController::class)->except(['show']);

// AppConfig
Route::prefix('app-config')->group(function () {
    Route::get('/edit-slider', [AppConfigController::class, 'editSlider'])->name('edit-slider');
    Route::post('/update-president-photo', [AppConfigController::class, 'updatePresidentPhoto']);
    Route::post('/add-slider-photos', [AppConfigController::class, 'addSliderPhotos']);
    Route::post('/delete-slider-photo', [AppConfigController::class, 'deleteSliderPhoto']);
});
// EventImages
Route::prefix('event-images')->group(function () {
    Route::post('/store', [EventImagesController::class, 'store']);
    Route::put('/update/{eventImages}', [EventImagesController::class, 'update']);
    Route::post('/delete-image-from-event/{eventImages}', [EventImagesController::class, 'deleteImageFromEvent']);
    Route::delete('/{eventImages}', [EventImagesController::class, 'delete']);
});
