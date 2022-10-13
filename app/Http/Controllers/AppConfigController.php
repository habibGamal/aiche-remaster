<?php

namespace App\Http\Controllers;

use App\Models\AppConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AppConfigController extends Controller
{
    public function editSlider()
    {
        return Inertia::render('Slider/Editor', [
            'sliderPhotosDB' => AppConfig::where('name', 'slider_photos')->first(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updatePresidentPhoto(Request $request)
    {
        $request->validate([
            'president_photo' => 'required|image'
        ]);
        // check if the field president_photo exists
        $path = saveImageAndGetPath($request->president_photo);
        $president_photo = AppConfig::where('name', 'president_photo')->first();
        if ($president_photo == null) {
            AppConfig::create([
                'name' => 'president_photo',
                'value' => $path,
            ]);
        } else {
            deleteImage($president_photo->value);
            $president_photo->value = $path;
            $president_photo->save();
        }
        return Redirect::route('home');
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateVision(Request $request)
    {
        $request->validate([
            'vision' => 'required|string',
            'vision_description' => 'required|string',
        ]);
        // check if the field vision exists
        $vision = AppConfig::where('name', 'vision')->first();
        $value = json_encode([
            'vision' => $request->vision,
            'vision_description' => $request->vision_description,
        ]);
        if ($vision == null) {
            AppConfig::create([
                'name' => 'vision',
                'value' => $value,
            ]);
        } else {
            $vision->value = $value;
            $vision->save();
        }
        return Redirect::route('home');
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function addSliderPhotos(Request $request)
    {
        $request->validate([
            'slider_photos' => 'array|min:1',
            'slider_photos.*' => 'image',
        ]);
        $paths = [];
        foreach ($request->slider_photos as $_ => $photo) {
            $paths[] = saveImageAndGetPath($photo);
        }
        // check if the field president_photo exists
        $slider_photos = AppConfig::where('name', 'slider_photos')->first();
        if ($slider_photos == null) {
            AppConfig::create([
                'name' => 'slider_photos',
                'value' => saveImagesAndGetPathsAsJson($request->slider_photos),
            ]);
        } else {
            $slider_photos->value = addImagesToJsonArr($slider_photos->value, $request->slider_photos);
            $slider_photos->save();
        }
        return Redirect::route('edit-slider');
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function deleteSliderPhoto(Request $request)
    {
        $request->validate([
            'photo_path' => 'required|string',
        ]);
        // get paths from db
        $slider_photos = AppConfig::where('name', 'slider_photos')->first();
        $slider_photos->value = deleteImageFromJsonArrImages($slider_photos->value, $request->photo_path);
        // save it
        $slider_photos->save();
        return Redirect::route('edit-slider');
    }
}
