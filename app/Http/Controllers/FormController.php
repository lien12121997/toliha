<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

use App\Http\Requests\StoreFormRequest;

class FormController extends Controller
{

    public function showForm()
    {
    	$this->data = [
            'title'        => 'Form',
        ];

        return view('form', $this->data);
    }

    public function postForm(StoreFormRequest $request)
    {
        try {
            DB::beginTransaction();
                $user = new User(); 
                $user->account_type = $request->input('account_type');
                $user->name         = $request->input('name');
                $user->email        = $request->input('email');
                $user->phone        = $request->input('phone');
                $user->password     = Hash::make($request->input('password'));
                $user->status       = $request->input('status');
                $user->code_perfix  = $request->input('code_perfix');
                $user->save();
                
            DB::commit();
        } catch (\Exception $e) {
            $this->manageException($e);
            return redirect()->back()->withInput()->withErrors(['msg' => 'Cannot update cause something wrong.']);
        }

        return redirect()->back()->with('msg', 'Successfully');
    }
}
