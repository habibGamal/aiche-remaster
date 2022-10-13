<?php

use Illuminate\Support\Facades\Storage;

if (!function_exists('deleteImage')) {
    function deleteImage($image)
    {
        return Storage::delete('public/images/' . $image);
    }
}
if (!function_exists('saveImageAndGetPath')) {
    function saveImageAndGetPath($image)
    {
        // Get filename with the extension
        $filenameWithExt = $image->getClientOriginalName();
        //Get just filename
        $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
        // Get just ext
        $extension = $image->getClientOriginalExtension();
        // Filename to store
        $fileNameToStore = $filename . '_' . time() . '.' . $extension;

        $image->storeAs('public/images', $fileNameToStore);

        return $fileNameToStore;
    }
}

if (!function_exists('saveImagesAndGetPathsAsJson')) {
    function saveImagesAndGetPathsAsJson($images)
    {
        $paths = [];
        foreach ($images as $_ => $image) {
            $paths[] = saveImageAndGetPath($image);
        }
        return json_encode($paths);
    }
}

if (!function_exists('addImagesToJsonArr')) {
    function addImagesToJsonArr($oldImagesAsJson, $images)
    {
        $paths = [];
        foreach ($images as $_ => $image) {
            $paths[] = saveImageAndGetPath($image);
        }
        return json_encode(array_merge(json_decode($oldImagesAsJson), $paths));
    }
}

if (!function_exists('deleteImageFromJsonImages')) {
    function deleteImageFromJsonArrImages($imagesAsJson, $imageNeedToDelete)
    {
        $paths = json_decode($imagesAsJson);
        // get index of the photo that we want to delete
        $indexWhereDelete = array_search($imageNeedToDelete, $paths);
        // unset it
        unset($paths[$indexWhereDelete]);
        // delete it
        deleteImage($imageNeedToDelete);
        // rearrage (get only values)
        $paths = array_values($paths);
        // encode it
        return json_encode($paths);
    }
}
