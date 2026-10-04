import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Shield, 
  Lock, 
  User, 
  ArrowRight, 
  KeyRound, 
  AlertCircle, 
  CheckCircle2, 
  BadgeCheck 
} from 'lucide-react';
import { INITIAL_STAFF_USERS } from '../../data/mockData';
import type { StaffRole } from '../../types';

export const StaffLogin: React.FC = () => {
  const { loginStaff, navigateTo } = useApp();

  const [staffId, setStaffId] = useState('demo.officer');
  const [password, setPassword] = useState('demo123');
  const [selectedRole, setSelectedRole] = useState<StaffRole>('Case Officer');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffId.trim()) {
      setErrorMsg('Please enter a valid Staff ID');
      return;
    }

    const success = loginStaff(staffId);
    if (!success) {
      // Fallback: map based on selected role
      const roleMap: Record<StaffRole, string> = {
        'Case Officer': 'demo.officer',
        'Counselor': 'dr.ananya',
        'Supervisor': 'sup.rajesh',
        'Administrator': 'admin.sih'
      };
      loginStaff(roleMap[selectedRole]);
    }
  };

  const handleQuickLogin = (id: string, role: StaffRole) => {
    setStaffId(id);
    setPassword('demo123');
    setSelectedRole(role);
    loginStaff(id);
  };

  return (
    <div className="py-12 px-4 sm:px-6 max-w-lg mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <button onClick={() => navigateTo('landing')} className="hover:underline">Home</button>
        <span>/</span>
        <span className="text-[#0b3b60] font-semibold">Authorized Personnel Authentication</span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Government Security Header */}
        <div className="bg-[#0b3b60] text-white p-6 sm:p-8 space-y-2 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <span>Demo Mode — SIH 2026</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center mx-auto border border-teal-500/30">
            <Shield size={26} />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            NHAA 14566 Staff Portal
          </h1>
          <p className="text-xs text-blue-100 max-w-xs mx-auto">
            Authorized Support Staff & Counselor Operations Console
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Demo Credentials Helper Pill */}
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
              <span className="flex items-center gap-1.5">
                <BadgeCheck size={14} className="text-amber-700" />
                Demo Credentials Provided
              </span>
              <span className="font-mono text-[11px] text-amber-700">Pass: demo123</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {INITIAL_STAFF_USERS.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleQuickLogin(user.id, user.role)}
                  className="p-2 text-left rounded bg-white hover:bg-amber-100/60 border border-amber-200/80 text-xs transition-colors"
                >
                  <div className="font-semibold text-slate-900 truncate">{user.name.split(' ')[0]} {user.name.split(' ')[1]}</div>
                  <div className="text-[10px] text-amber-800 font-medium truncate">{user.role}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle size={15} />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                Staff ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User size={16} />
                </div>
                <input
                  id="staff-id-input"
                  type="text"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  placeholder="e.g. demo.officer"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-hidden font-mono"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <KeyRound size={16} />
                </div>
                <input
                  id="staff-password-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-hidden"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                Designated Role
              </label>
              <select
                id="staff-role-select"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as StaffRole)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm outline-hidden bg-white text-slate-800"
              >
                <option value="Case Officer">Case Officer (First Response & Triage)</option>
                <option value="Counselor">Counselor (Psychological Support)</option>
                <option value="Supervisor">Supervisor (Emergency Oversight)</option>
                <option value="Administrator">Administrator (Governance & Audit)</option>
              </select>
            </div>

            <button
              id="staff-login-btn"
              type="submit"
              className="w-full py-3 rounded-lg bg-[#0b3b60] hover:bg-[#07253d] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all mt-4 cursor-pointer"
            >
              <Lock size={16} />
              Authenticate into NHAA Console
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Security Disclaimer */}
          <div className="pt-2 text-center text-[11px] text-slate-500">
            Authorized access only. Unauthorized intrusion attempts are logged under the Information Technology Act.
          </div>
        </div>
      </div>
    </div>
  );
};
