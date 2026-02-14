<?php

// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\Admin\AuthController;
// use App\Http\Controllers\Admin\ActivityLogController;
// use App\Http\Controllers\LeadController;
// use App\Http\Controllers\DashboardController;

// // Public routes - NO middleware needed for API routes
// Route::post('/admin/login', [AuthController::class, 'login']);

// Route::middleware(['auth:admin'])->prefix('admin')->group(function () {
//     Route::get('/leads', [LeadController::class, 'index']);
//     Route::get('/activity-logs', [ActivityLogController::class, 'index']);
// });

// // Protected admin routes
// Route::middleware(['auth:admin'])->prefix('admin')->group(function () {
//     Route::post('/logout', [AuthController::class, 'logout']);
//     Route::get('/dashboard/stats', [DashboardController::class, 'index']);
//     Route::get('/leads', [LeadController::class, 'index']);
//     Route::post('/leads', [LeadController::class, 'store']);
//     Route::put('/leads/{id}', [LeadController::class, 'update']);
//     Route::delete('/leads/{id}', [LeadController::class, 'destroy']);
//     Route::get('/activity-logs', [ActivityLogController::class, 'index']);
// });
