<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {	
    	$dateTime = date('Y-m-d H:i:s');

        DB::table('users')->insert([
        	'account_type' => 1,
            'name' 		   => 'admin',
            'email' 	   => 'admin@gmail.com',
            'phone' 	   => '0123456789',
            'password' 	   => bcrypt('123456'),
            'status' 	   => 'Hoạt động',
            'code_perfix'  => rand(000000,999999),
            'created_at'   => $dateTime,
            'updated_at'   => $dateTime,
        ]);
    }
}
