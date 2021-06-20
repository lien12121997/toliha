<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

use App\Http\Repositories\FormRepo;
use App\Http\Requests\StoreFormRequest;

class FormController extends Controller
{
    function __construct(FormRepo $formRepo) {
        $this->formRepo = $formRepo;
    }

    public function showForm()
    {
    	$this->data = [
            'title' => 'Form',
        ];

        return view('form', $this->data);
    }

    public function postForm(StoreFormRequest $request)
    {
        try {
            DB::beginTransaction();
                if(!empty($request->user_id))
                    $user = User::find($request->user_id);
                else
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

        return redirect()->route('form.list')->with('msg', 'Successfully');
    }

    public function list(Request $request) {
        $this->data = [
            'title' => 'Form',
        ];

        if($request->ajax()) {
            return $this->formRepo->list();
        }

        return view('list', $this->data);
    }

    public function editForm($id)
    {
        $this->data = [
            'title' => 'Form',
            'user'  => User::find($id),
        ];

        return view('form', $this->data);
    }

    public function deleteForm($id)
    {
        try {
            DB::beginTransaction();
                User::destroy($id);
            DB::commit();
        } catch (\Exception $e) {
            $this->manageException($e);
            return redirect()->back()->withInput()->withErrors(['msg' => 'Cannot delete cause something wrong.']);
        }

        return redirect()->route('form.list')->with('msg', 'Successfully');
    }
}
