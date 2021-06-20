<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Laravel\Jetstream\Jetstream;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array  $input
     * @return \App\Models\User
     */
    public function create(array $input)
    {
        Validator::make($input, [
            'account_type' => ['required'],
            'name'         => ['required', 'string', 'max:255'],
            'email'        => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'phone'        => ['required', 'string', 'max:255', 'unique:users'],
            'password'     => ['required', 'string'],
            //'password'     => $this->passwordRules(),
            'status'       => ['required'],
            'code_perfix'  => ['required', 'max:255'],
            //'terms' => Jetstream::hasTermsAndPrivacyPolicyFeature() ? ['required', 'accepted'] : '',
        ])->validate();

        return User::create([
            'account_type' => $input['account_type'],
            'name'         => $input['name'],
            'email'        => $input['email'],
            'phone'        => $input['phone'],
            'password'     => Hash::make($input['password']),
            'status'       => $input['status'],
            'code_perfix'  => $input['code_perfix'],
        ]);
    }
}
