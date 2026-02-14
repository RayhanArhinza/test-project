<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LeadController extends Controller
{
    public function index(Request $request)
    {
        $query = Lead::query();

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('email', 'LIKE', "%{$search}%")
                  ->orWhere('whatsapp_number', 'LIKE', "%{$search}%")
                  ->orWhere('institution_name', 'LIKE', "%{$search}%");
            });
        }

        $leads = $query->latest()->paginate(10);

        return response()->json([
            'data' => $leads->items(),
            'total' => $leads->total(),
            'per_page' => $leads->perPage(),
            'current_page' => $leads->currentPage(),
            'last_page' => $leads->lastPage(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'whatsapp_number' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'institution_name' => 'required|string|max:255',
        ]);

        $lead = Lead::create($validated);


        $admin = Auth::guard('admin')->user();
        if ($admin) {
            ActivityLog::create([
                'admin_id' => $admin->id,
                'action' => 'create_lead',
                'description' => "{$admin->name} menambahkan lead baru: {$lead->name} (ID #{$lead->id})",
                'model_type' => 'Lead',
                'model_id' => $lead->id,
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent()
            ]);
        }

        return response()->json([
            'message' => 'Lead berhasil ditambahkan',
            'data' => $lead
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $lead = Lead::findOrFail($id);

        // Simpan data lama untuk log
        $oldData = $lead->toArray();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'whatsapp_number' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'institution_name' => 'required|string|max:255',
        ]);

        $lead->update($validated);


        $admin = Auth::guard('admin')->user();
        if ($admin) {
            ActivityLog::create([
                'admin_id' => $admin->id,
                'action' => 'update_lead',
                'description' => "{$admin->name} mengupdate data lead: {$lead->name} (ID #{$lead->id})",
                'model_type' => 'Lead',
                'model_id' => $lead->id,
                'old_values' => json_encode($oldData),
                'new_values' => json_encode($lead->toArray()),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent()
            ]);
        }

        return response()->json([
            'message' => 'Lead berhasil diupdate',
            'data' => $lead
        ]);
    }

    public function destroy($id)
    {
        $lead = Lead::findOrFail($id);
        $leadName = $lead->name;
        $leadId = $lead->id;

        $lead->delete();


        $admin = Auth::guard('admin')->user();
        if ($admin) {
            ActivityLog::create([
                'admin_id' => $admin->id,
                'action' => 'delete_lead',
                'description' => "{$admin->name} menghapus data lead: {$leadName} (ID #{$leadId})",
                'model_type' => 'Lead',
                'model_id' => $leadId,
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent()
            ]);
        }

        return response()->json([
            'message' => 'Lead berhasil dihapus'
        ]);
    }
}
