<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    final function manageException($errors) {
        DB::rollback();
        Log::channel('daily')->info($errors->getMessage() . ' - ' . $errors->getFile() . ' - ' . $errors->getLine() . "\r\n");
    }

    final function daylyLog($str) {
        Log::channel('daily')->info($str . "\r\n");	
    }
}
