<?php

namespace App\Http\Controllers;

use App\Models\EventImages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class EventImagesController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'event_name' => 'required|string',
            'event_images' => 'required|array|min:1',
            'event_images.*' => 'image',
        ]);
        EventImages::create([
            'event_name' => $request->event_name,
            'event_images' => saveImagesAndGetPathsAsJson($request->event_images),
        ]);
        return Redirect::route('home');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\EventImages  $eventImages
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, EventImages $eventImages)
    {
        $request->validate([
            'event_images' => 'required|array|min:1',
            'event_images.*' => 'image',
        ]);

        $eventImages->event_images = addImagesToJsonArr($eventImages->event_images, $request->event_images);
        $eventImages->save();
        return Redirect::route('home');
    }

    /**
     * Remove image from event
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\EventImages  $eventImages
     * @return \Illuminate\Http\RedirectResponse
     */
    public function deleteImageFromEvent(Request $request, EventImages $eventImages)
    {
        $request->validate([
            'image_name' => 'required|string',
        ]);

        $eventImages->event_images = deleteImageFromJsonArrImages($eventImages->event_images, $request->image_name);
        if ($eventImages->event_images == '[]')
            $eventImages->delete();
        else
            $eventImages->save();

        return Redirect::route('home');
    }


    /**
     * Remove image from event
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\EventImages  $eventImages
     * @return \Illuminate\Http\RedirectResponse
     */
    public function delete(EventImages $eventImages)
    {
        $eventImages->delete();
        return Redirect::route('home');
    }
}
