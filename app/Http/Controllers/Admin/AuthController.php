<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $admin = Admin::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json([
                'message' => 'Email atau password salah'
            ], 401);
        }

        Auth::guard('admin')->login($admin);
        $request->session()->regenerate();

        // ✅ TAMBAHKAN: Log aktivitas login
        ActivityLog::create([
            'admin_id' => $admin->id,
            'action' => 'login',
            'description' => "{$admin->name} login ke sistem",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent()
        ]);

        return response()->json([
            'message' => 'Login berhasil',
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
            ]
        ]);
    }

    public function logout(Request $request)
    {
        $admin = Auth::guard('admin')->user();

        if ($admin) {
            ActivityLog::create([
                'admin_id' => $admin->id,
                'action' => 'logout',
                'description' => "{$admin->name} logout dari sistem",
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent()
            ]);
        }

        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logout berhasil'
        ]);
    }

    public function check(Request $request)
    {
        $admin = Auth::guard('admin')->user();

        if (!$admin) {
            return response()->json([
                'authenticated' => false
            ], 401);
        }

        return response()->json([
            'authenticated' => true,
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
            ]
        ]);
    }
}
