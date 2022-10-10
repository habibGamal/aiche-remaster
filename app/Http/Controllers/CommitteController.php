<?php

namespace App\Http\Controllers;

use App\Models\Committe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CommitteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function index()
    {
        return Redirect::route('home');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Committes/Editor');
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
            'icon' => 'required|string',
            'description' => 'required|string',
        ]);
        Committe::create([
            'name' => $request->name,
            'icon' => $request->icon,
            'description' => $request->description,
        ]);
        return Redirect::route('committes.create');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Committe  $committe
     * @return \Inertia\Response
     */
    public function edit(Committe $committe)
    {
        return Inertia::render('Committes/Editor', ['committeDB' => $committe]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Committe  $committe
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Committe $committe)
    {
        $request->validate([
            'name' => 'required|string',
            'icon' => 'required|string',
            'description' => 'required|string',
        ]);
        $committe->name = $request->name;
        $committe->icon = $request->icon;
        $committe->description = $request->description;
        $committe->save();
        return Redirect::route('committes.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Committe  $committe
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Committe $committe)
    {
        $committe->delete();
        return Redirect::route('committes.index');
    }
}
