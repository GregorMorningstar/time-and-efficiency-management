<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ModeratorController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});





//role routes

//admin
Route::middleware(['auth','verified'])->prefix('/admin')->group(function () {
   Route::get('/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
});

//moderator (role check temporarily disabled in revert state)
Route::middleware(['auth','verified'])->prefix('/moderator')->group(function () {
    Route::get('/dashboard', [ModeratorController::class, 'index'])->name('moderator.dashboard');
});

//employee (role check temporarily disabled in revert state)
Route::middleware(['auth','verified'])->prefix('/employee')->group(function () {
      Route::get('/dashboard', [EmployeeController::class, 'index'])->name('employee.dashboard');
});


//all role
Route::middleware('auth')->group(function () {
    Route::get('/chat', [ChatController::class, 'index'])->name('chat.index');
    Route::post('/chat', [ChatController::class, 'store'])->name('chat.store');
}); 

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

