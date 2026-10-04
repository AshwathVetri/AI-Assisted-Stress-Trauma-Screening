import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Inbox, 
  BarChart3, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Menu, 
  X, 
  User, 
  Bell, 
  AlertTriangle,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import type { AppView } from '../../types';

interface StaffLayoutProps {
  children: React.ReactNode;
}

export const StaffLayout: React.FC<StaffLayoutProps> = ({ children }) => {
  const { 
    currentView, 
    navigateTo, 
    currentUser, 
    logoutStaff, 
    cases 
  } = useApp();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingCount = cases.filter(c => c.status === 'Pending Review').length;
  const criticalCount = cases.filter(c => c.screeningLevel === 'CRITICAL' && c.status !== 'Closed').length;

  const navItems: { id: AppView; label: string; icon: any; badge?: number; badgeColor?: string }[] = [
    { 
      id: 'staff-dashboard', 
      label: 'Dashboard & Queue', 
      icon: LayoutDashboard,
      badge: pendingCount,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
    },
    { 
      id: 'analytics', 
      label: 'Analytics & Insights', 
      icon: BarChart3 
    },
    { 
      id: 'explainability', 
      label: 'AI Explainability (XAI)', 
      icon: Sparkles 
    },
    { 
      id: 'security', 
      label: 'Security & DPDPA', 
      icon: Lock 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Staff Navigation Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-1.5 text-slate-300 hover:text-white rounded-md hover:bg-slate-800"
              aria-label="Toggle sidebar menu"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
                14
              </div>
              <div>
                <span className="font-bold text-sm sm:text-base text-white tracking-tight flex items-center gap-2">
                  NHAA AI Screening Dashboard
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                    DEMO ENVIRONMENT
                  </span>
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:block">
                  National Helpline for Anti-Ragging & Atrocities • Decision-Support Console
                </span>
              </div>
            </div>
          </div>

          {/* User info & Logout */}
          <div className="flex items-center gap-3">
            {criticalCount > 0 && (
              <div className="hidden sm:flex items-center gap-1.5 bg-rose-950/80 border border-rose-700/80 text-rose-300 text-xs px-2.5 py-1 rounded-full animate-pulse">
                <AlertTriangle size={13} className="text-rose-400" />
                <span>{criticalCount} Critical Cases</span>
              </div>
            )}

            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-700 text-xs">
              <div className="w-7 h-7 rounded-full bg-blue-900 flex items-center justify-center text-teal-300 font-bold border border-blue-700">
                <User size={14} />
              </div>
              <div>
                <div className="font-bold text-slate-200 leading-tight">
                  {currentUser?.name || 'Officer'}
                </div>
                <div className="text-[10px] text-teal-400 font-medium">
                  {currentUser?.role || 'Staff'} • {currentUser?.badgeNumber}
                </div>
              </div>
            </div>

            <button
              id="staff-logout-btn"
              onClick={logoutStaff}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Logout from staff console"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Desktop */}
        <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200 shrink-0">
          <div className="p-4 border-b border-slate-100">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Active Console
            </div>
            <div className="text-xs font-semibold text-slate-700 truncate">
              {currentUser?.department || 'Triage Operations'}
            </div>
          </div>

          <nav className="p-3 space-y-1 flex-1">
            {navItems.map((item) => {
              const active = currentView === item.id || (item.id === 'staff-dashboard' && currentView === 'case-details');
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-medium transition-all ${
                    active 
                      ? 'bg-blue-50 text-[#0b3b60] font-bold shadow-2xs' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} className={active ? 'text-teal-700' : 'text-slate-400'} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full border ${item.badgeColor || 'bg-slate-100 text-slate-700'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick link to Victim Portal */}
          <div className="p-4 border-t border-slate-100 space-y-2 bg-slate-50/50">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Evaluation Navigation
            </div>
            <button
              onClick={() => navigateTo('landing')}
              className="w-full py-2 px-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-between transition-colors shadow-2xs"
            >
              <span>Public Landing Page</span>
              <ExternalLink size={13} className="text-slate-400" />
            </button>
            <button
              onClick={() => navigateTo('consent')}
              className="w-full py-2 px-2.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 text-xs font-semibold flex items-center justify-between transition-colors"
            >
              <span>Simulate Victim Intake</span>
              <ChevronRight size={13} className="text-teal-700" />
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs flex">
            <div className="w-64 bg-white h-full flex flex-col p-4 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-sm text-[#0b3b60]">Menu</span>
                <button onClick={() => setSidebarOpen(false)} className="p-1 rounded text-slate-500">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      navigateTo(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-medium ${
                      currentView === item.id ? 'bg-blue-50 text-[#0b3b60] font-bold' : 'text-slate-600'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100">{item.badge}</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2 mt-auto">
                <button
                  onClick={() => {
                    navigateTo('landing');
                    setSidebarOpen(false);
                  }}
                  className="w-full py-2 text-xs text-left text-slate-700"
                >
                  Exit to Public Portal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
