<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function index()
    {
        return Redirect::route('about');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Members/Editor');
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
            'position' => 'required|string',
            'facebook' => 'required|string',
            'linkedin' => 'required|string',
            'profile' => 'required|image',
            'in' => ['required', Rule::in(['team', 'highboard', 'board'])]
        ]);
        $profile = saveImageAndGetPath($request->profile);
        Member::create([
            'name' => $request->name,
            'position' => $request->position,
            'facebook' => $request->facebook,
            'linkedin' => $request->linkedin,
            'profile' => $profile,
            'in' => $request->in
        ]);
        return Redirect::route('members.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Member  $member
     * @return \Inertia\Response
     */
    public function edit(Member $member)
    {
        return Inertia::render('Members/Editor', ['memberDB' => $member]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Member  $member
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Member $member)
    {
        $request->validate([
            'name' => 'required|string',
            'position' => 'required|string',
            'facebook' => 'required|string',
            'linkedin' => 'required|string',
            'profile' => 'nullable|image',
            'in' => ['required', Rule::in(['team', 'highboard', 'board'])]
        ]);
        if ($request->hasFile('profile')) {
            $profile = saveImageAndGetPath($request->profile);
            deleteImage($member->profile);
            $member->profile = $profile;
        }
        $member->name = $request->name;
        $member->position = $request->position;
        $member->facebook = $request->facebook;
        $member->linkedin = $request->linkedin;
        $member->in = $request->in;
        $member->save();
        return Redirect::route('members.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Member  $member
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Member $member)
    {
        deleteImage($member->profile);
        $member->delete();
        return Redirect::route('members.index');
    }
}
