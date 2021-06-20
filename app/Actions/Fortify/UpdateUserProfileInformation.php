<?php

namespace App\Actions\Fortify;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\UpdatesUserProfileInformation;

class UpdateUserProfileInformation implements UpdatesUserProfileInformation
{
    /**
     * Validate and update the given user's profile information.
     *
     * @param  mixed  $user
     * @param  array  $input
     * @return void
     */
    public function update($user, array $input)
    {
        Validator::make($input, [
            'account_type' => ['required'],
            'name'         => ['required', 'string', 'max:255'],
            'email'        => ['required', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'phone'        => ['required', 'max:255', Rule::unique('users')->ignore($user->id)],
            'password'     => ['required', 'string'],
            'status'       => ['required'],
            'code_perfix'  => ['required', 'max:255'],
        ])->validateWithBag('updateProfileInformation');

        if ($input['email'] !== $user->email &&
            $user instanceof MustVerifyEmail) {
            $this->updateVerifiedUser($user, $input);
        } else {
            $user->forceFill([
                'account_type' => $input['account_type'],
                'name'         => $input['name'],
                'email'        => $input['email'],
                'phone'        => $input['phone'],
                'password'     => Hash::make($input['password']),
                'status'       => $input['status'],
                'code_perfix'  => $input['code_perfix'],
            ])->save();
        }
    }

    /**
     * Update the given verified user's profile information.
     *
     * @param  mixed  $user
     * @param  array  $input
     * @return void
     */
    protected function updateVerifiedUser($user, array $input)
    {
        $user->forceFill([
            'account_type' => $input['account_type'],
            'name'         => $input['name'],
            'email'        => $input['email'],
            'phone'        => $input['phone'],
            'password'     => Hash::make($input['password']),
            'status'       => $input['status'],
            'code_perfix'  => $input['code_perfix'],
        ])->save();

        $user->sendEmailVerificationNotification();
    }
}
