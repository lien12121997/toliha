<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    });

    Route::get('/form', [FormController::class, 'showForm'])->name('form');
	Route::post('/form', [FormController::class, 'postForm'])->name('post.form');

	Route::get('/list', [FormController::class, 'list'])->name('form.list');
	Route::get('/edit/{id}', [FormController::class, 'editForm'])->name('form.edit');
	Route::get('/delete/{id}', [FormController::class, 'deleteForm'])->name('form.delete');
});
