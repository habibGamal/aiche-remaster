<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class SliderController extends Controller
{

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Slider/Editor', [
            'slidersDB' => Slider::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'link' => 'nullable|string',
            'slider_photo' => 'required|image'
        ]);
        $path = saveImageAndGetPath($request->slider_photo);
        Slider::create([
            'link'=>$request->link,
            'path'=>$path,
        ]);
        return Redirect::route('slider.create');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Slider  $slider
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Slider $slider)
    {
        $request->validate([
            'link' => 'required|string',
        ]);
        $slider->link = $request->link;
        $slider->save();
        return Redirect::route('slider.create');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Slider  $slider
     * @return \Illuminate\Http\Response
     */
    public function destroy(Slider $slider)
    {
        deleteImage($slider->path);
        $slider->delete();
        return Redirect::route('slider.create');
    }
}
