<?php

use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('employees', [EmployeeController::class, 'index'])->name('employeesIndex');
    Route::get('employees/create', [App\Http\Controllers\EmployeeController::class, 'create'])->name('employeesCreate');
    Route::post('employees', [App\Http\Controllers\EmployeeController::class, 'store'])->name('employees.store');
    Route::get('employees/{employee}', [App\Http\Controllers\EmployeeController::class, 'show'])->name('employeesShow');
    Route::get('employees/{employee}/edit', [App\Http\Controllers\EmployeeController::class, 'edit'])->name('employeesEdit');
    Route::put('employees/{employee}', [App\Http\Controllers\EmployeeController::class, 'update'])->name('employeesUpdate');
    Route::delete('employees/{employee}', [App\Http\Controllers\EmployeeController::class, 'destroy'])->name('employeesDestroy');
});

require __DIR__ . '/settings.php';
