<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {

        $totalLeads = Lead::count();


        $leadsThisMonth = Lead::whereMonth('created_at', Carbon::now()->month)
                              ->whereYear('created_at', Carbon::now()->year)
                              ->count();


        $leadsToday = Lead::whereDate('created_at', Carbon::today())->count();


        $leadsThisWeek = Lead::whereBetween('created_at', [
            Carbon::now()->startOfWeek(),
            Carbon::now()->endOfWeek()
        ])->count();


        $leadsLastMonth = Lead::whereMonth('created_at', Carbon::now()->subMonth()->month)
                              ->whereYear('created_at', Carbon::now()->subMonth()->year)
                              ->count();

        $growthPercentage = $leadsLastMonth > 0
            ? round((($leadsThisMonth - $leadsLastMonth) / $leadsLastMonth) * 100, 1)
            : ($leadsThisMonth > 0 ? 100 : 0);


        $topInstitutions = Lead::select('institution_name', DB::raw('count(*) as total'))
                               ->whereNotNull('institution_name')
                               ->where('institution_name', '!=', '')
                               ->groupBy('institution_name')
                               ->orderBy('total', 'desc')
                               ->limit(5)
                               ->get();

        $recentLeads = Lead::latest()
                           ->limit(5)
                           ->get();

        $recentActivities = ActivityLog::with('admin')
                                       ->latest()
                                       ->limit(5)
                                       ->get();

        $leadsChart = Lead::select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('count(*) as total')
            )
            ->where('created_at', '>=', Carbon::now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        return response()->json([
            'stats' => [
                'total_leads' => $totalLeads,
                'leads_today' => $leadsToday,
                'leads_this_week' => $leadsThisWeek,
                'leads_this_month' => $leadsThisMonth,
                'growth_percentage' => $growthPercentage,
            ],
            'top_institutions' => $topInstitutions,
            'recent_leads' => $recentLeads,
            'recent_activities' => $recentActivities,
            'leads_chart' => $leadsChart,
        ]);
    }
}
