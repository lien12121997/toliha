<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Request;
use Illuminate\Support\Facades\Auth;

class StoreFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    
    protected $condition = [
        'float_5' => '/[0-9]{1,5}\.[0-9]{2}/',
        'float_8' => '/[0-9]{1,8}\.[0-9]{2}/'
    ];

    protected $customized_message = [
        'float_5' => 'should less than 99999 and only accept 2 digits for decimal',
        'float_8' => 'should less than 99999999 and only accept 2 digits for decimal',
    ];

    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {   
        $rules = [
            'account_type' => 'required',
            'name'         => 'required|max:255',
            'email'        => 'required|email|max:255|unique:users,email',
            'phone'        => 'required|max:255|unique:users,phone',
            'password'     => 'required|max:255',
            'status'       => 'required',
            'code_perfix'  => 'required|max:255',
        ];

        return $rules;
    }

    public function messages() {
        $messages = [
            'account_type.required' => 'Trường này là bắt buộc',
            'name.required'         => 'Tên là bắt buộc',
            'name.max'              => 'Tên không được dài quá 255 ký tự',
            'email.required'        => 'Email là bắt buộc',
            'email.email'           => 'Email không đúng định dạng',
            'email.max'             => 'Email không được dài quá 255 ký tự',
            'email.unique'          => 'Email này đã tồn tại',
            'phone.required'        => 'SĐT là bắt buộc',
            'phone.max'             => 'SĐT không được dài quá 255 ký tự',
            'phone.unique'          => 'SĐT này đã tồn tại',
            'password.required'     => 'Mật khẩu là bắt buộc',
            'password.max'          => 'Mật khẩu không được dài quá 255 ký tự',
            'status.required'       => 'Trạng thái là bắt buộc',
            'code_perfix.required'  => 'Max Perfix là bắt buộc',
            'code_perfix.max'       => 'Max Perfix không được dài quá 255 ký tự',
        ];

        return $messages;
    }
}
