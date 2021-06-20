<?php
namespace App\Http\Repositories;

use Illuminate\Http\Request;
use Yajra\Datatables\Datatables;

use App\Models\User;

class FormRepo {

	public function list() {
        $users = User::all();

        return Datatables::of($users)
            ->addColumn('account_type', function($user) {
                return $user->account_type == 0 ? 'Cá nhân' : 'Tổ chức';
            })
            ->addColumn('updated_at', function($user) {
                return date('d-m-Y H:i:s', strtotime($user->updated_at));
            })
            ->addColumn('status', function($user) {
                return $user->status == 1 ? 'Hoạt động' : 'Dừng';
            })
            ->addColumn('action', function($user) {
                $str = '<div class="btn-group"><a href="'.route('form.edit', $user->id).'" class="btn btn-xs btn-info" title="Edit">
                            <i class="ace-icon fa fa-pencil bigger-120"></i>
                        </a>';
                
                $str .= '<a href="'.route('form.delete', $user->id).'" class="btn btn-xs btn-danger" title="Delete">
                            <i class="ace-icon fa fa-trash-o bigger-120"></i>
                        </a>';
                $str .= '</div>';
                return $str;
            })
            ->rawColumns(['account_type', 'updated_at', 'status', 'action'])
            ->make(true);
	}
}