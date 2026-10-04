import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Shield, 
  PhoneCall, 
  Lock, 
  Menu, 
  X, 
  FileCheck2, 
  Sparkles, 
  Info,
  ExternalLink
} from 'lucide-react';

export const Header: React.FC = () => {
  const { currentView, navigateTo, currentUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isStaffView = [
    'staff-dashboard', 
    'case-details', 
    'analytics', 
    'explainability', 
    'security'
  ].includes(currentView);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top National Public Service Tricolor Ribbon */}
      <div className="gov-stripes w-full" />

      {/* Top Info Bar: Government of India & Emergency Hotlines */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="font-semibold text-white tracking-wide">भारत सरकार | Government of India</span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-300">Ministry of Social Justice & Empowerment / UGC</span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="bg-blue-900 text-blue-200 text-[11px] font-mono px-2 py-0.5 rounded border border-blue-700">
              SIH26093
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 text-slate-300">
            <div className="flex items-center gap-1.5 text-amber-300 font-medium">
              <PhoneCall size={12} className="animate-pulse text-amber-400" />
              <span>National Helpline: <strong className="text-white underline">14566</strong></span>
            </div>
            <span className="hidden sm:inline text-slate-600">|</span>
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
              <span>Police: 112</span>
              <span>•</span>
              <span>Women: 1091</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand / Logo */}
        <div 
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-3 cursor-pointer group"
          role="button"
          tabIndex={0}
        >
          <div className="w-10 h-10 rounded-lg bg-[#0b3b60] flex items-center justify-center text-white shadow-sm border border-blue-900 group-hover:bg-[#07253d] transition-colors">
            <Shield size={22} className="text-teal-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold text-[#0b3b60] tracking-tight leading-tight">
                Scholar Sphere
              </span>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300 uppercase tracking-wider">
                SIH 2026
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-none mt-0.5">
              AI Stress & Trauma Screening Module • NHAA 14566
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-700">
          <button
            onClick={() => navigateTo('landing')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              currentView === 'landing' 
                ? 'bg-blue-50 text-[#0b3b60] font-semibold' 
                : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => {
              if (currentView === 'landing') {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                navigateTo('landing');
                setTimeout(() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="px-3 py-1.5 rounded-md hover:bg-slate-100 text-slate-600 transition-colors"
          >
            How It Works
          </button>

          <button
            onClick={() => navigateTo('explainability')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${
              currentView === 'explainability' 
                ? 'bg-blue-50 text-[#0b3b60] font-semibold' 
                : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            <Sparkles size={14} className="text-teal-600" />
            Explainable AI
          </button>

          <button
            onClick={() => navigateTo('security')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${
              currentView === 'security' 
                ? 'bg-blue-50 text-[#0b3b60] font-semibold' 
                : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            <Lock size={14} className="text-slate-500" />
            DPDPA & Privacy
          </button>

          <div className="h-5 w-px bg-slate-300 mx-2" />

          {/* Assessment CTA */}
          <button
            onClick={() => navigateTo('consent')}
            className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs sm:text-sm shadow-xs flex items-center gap-1.5 transition-all"
          >
            <FileCheck2 size={16} />
            Start Assessment
          </button>

          {/* Staff Login / Portal Button */}
          {currentUser && isStaffView ? (
            <button
              onClick={() => navigateTo('staff-dashboard')}
              className="px-3.5 py-2 rounded-lg bg-[#0b3b60] hover:bg-[#07253d] text-white font-medium text-xs sm:text-sm shadow-xs flex items-center gap-1.5 transition-all"
            >
              <Shield size={15} className="text-teal-300" />
              Staff Console
            </button>
          ) : (
            <button
              onClick={() => navigateTo('staff-login')}
              className="px-3.5 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all"
            >
              <Lock size={14} className="text-slate-500" />
              Authorized Staff Login
            </button>
          )}
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => navigateTo('consent')}
            className="px-3 py-1.5 rounded bg-teal-700 text-white text-xs font-medium"
          >
            Assess
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-md"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <button
            onClick={() => {
              navigateTo('landing');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
          >
            Home
          </button>
          <button
            onClick={() => {
              navigateTo('consent');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-teal-700 bg-teal-50 rounded flex items-center gap-2"
          >
            <FileCheck2 size={16} />
            Start Assessment (Victim Intake)
          </button>
          <button
            onClick={() => {
              navigateTo('explainability');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded flex items-center gap-2"
          >
            <Sparkles size={16} className="text-teal-600" />
            Explainable AI Sandbox
          </button>
          <button
            onClick={() => {
              navigateTo('security');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded flex items-center gap-2"
          >
            <Lock size={16} className="text-slate-500" />
            DPDPA & Data Privacy
          </button>
          <div className="pt-2 border-t border-slate-200">
            <button
              onClick={() => {
                navigateTo(currentUser ? 'staff-dashboard' : 'staff-login');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-[#0b3b60] bg-blue-50 rounded flex items-center gap-2"
            >
              <Shield size={16} />
              {currentUser ? 'Staff Operations Console' : 'Authorized Staff Login'}
            </button>
          </div>
          <div className="pt-2 text-xs text-slate-500 flex items-center justify-between">
            <span>National Helpline: 14566</span>
            <span className="text-slate-400">Team 178723</span>
          </div>
        </div>
      )}

      {/* Crucial Non-Diagnostic Notice Banner (Prominently requested) */}
      <div className="bg-amber-50/90 border-b border-amber-200/80 px-4 py-1.5 text-center text-xs text-amber-900">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5">
          <Info size={13} className="text-amber-700 shrink-0" />
          <span>
            <strong>Public Service Notice:</strong> AI-assisted screening for decision support only. This system does <strong>not</strong> provide medical or psychiatric diagnoses. Final triage decisions are made by authorized personnel.
          </span>
        </div>
      </div>
    </header>
  );
};
