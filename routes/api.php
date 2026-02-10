<?php

use App\Http\Controllers\Api\EmployeeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Health check
Route::get('/health', function () {
    return response()->json([
        'success' => true,
        'message' => 'Server is running',
        'timestamp' => now()->toIso8601String(),
    ]);
});

Route::middleware('auth:sanctum')->group(function () {
    // User info
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Employee routes
    Route::prefix('employees')->group(function () {
        Route::get('/', [EmployeeController::class, 'index']);
        Route::get('/{employee}', [EmployeeController::class, 'show']);
        Route::post('/', [EmployeeController::class, 'store']);
        Route::put('/{employee}', [EmployeeController::class, 'update']);
        Route::delete('/{employee}', [EmployeeController::class, 'destroy']);
    });
});
