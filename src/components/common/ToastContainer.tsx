import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const styles = {
          success: 'bg-emerald-900/95 text-white border-emerald-600',
          warning: 'bg-amber-900/95 text-white border-amber-600',
          error: 'bg-rose-900/95 text-white border-rose-600',
          info: 'bg-slate-900/95 text-white border-slate-700'
        }[toast.type];

        const icons = {
          success: <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />,
          warning: <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />,
          error: <AlertCircle size={18} className="text-rose-400 shrink-0 mt-0.5" />,
          info: <Info size={18} className="text-teal-400 shrink-0 mt-0.5" />
        }[toast.type];

        return (
          <div
            key={toast.id}
            role="alert"
            className={`pointer-events-auto flex items-start justify-between gap-3 p-3.5 rounded-lg border shadow-xl backdrop-blur-sm text-xs transition-all animate-in fade-in slide-in-from-top-2 ${styles}`}
          >
            <div className="flex items-start gap-2.5">
              {icons}
              <p className="font-medium leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
              aria-label="Dismiss notification"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
