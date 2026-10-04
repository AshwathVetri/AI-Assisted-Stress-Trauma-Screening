import React from 'react';
import type { RiskLevel } from '../../types';
import { ShieldCheck, AlertCircle, AlertTriangle, Siren } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ 
  level, 
  size = 'md',
  showIcon = true 
}) => {
  const config = {
    LOW: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      iconBg: 'bg-emerald-100 text-emerald-700',
      icon: ShieldCheck,
      label: 'LOW',
      sublabel: 'Standard Queue'
    },
    MODERATE: {
      bg: 'bg-amber-50 text-amber-800 border-amber-300',
      iconBg: 'bg-amber-100 text-amber-700',
      icon: AlertCircle,
      label: 'MODERATE',
      sublabel: 'Counselor Review'
    },
    HIGH: {
      bg: 'bg-orange-50 text-orange-900 border-orange-300',
      iconBg: 'bg-orange-100 text-orange-700',
      icon: AlertTriangle,
      label: 'HIGH',
      sublabel: 'Prompt Attention'
    },
    CRITICAL: {
      bg: 'bg-rose-50 text-rose-900 border-rose-300',
      iconBg: 'bg-rose-100 text-rose-700',
      icon: Siren,
      label: 'CRITICAL',
      sublabel: 'Immediate Action'
    }
  }[level] || {
    bg: 'bg-slate-100 text-slate-800 border-slate-300',
    iconBg: 'bg-slate-200 text-slate-700',
    icon: AlertCircle,
    label: level,
    sublabel: 'Screening'
  };

  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 font-medium gap-1',
    md: 'text-xs px-2.5 py-1 font-semibold gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 font-bold gap-2'
  }[size];

  const iconSizes = {
    sm: 13,
    md: 15,
    lg: 18
  }[size];

  return (
    <span 
      className={`inline-flex items-center rounded-full border shadow-xs tracking-wide uppercase ${config.bg} ${sizeClasses}`}
      aria-label={`Screening priority level: ${config.label} - ${config.sublabel}`}
      role="status"
    >
      {showIcon && (
        <span className={`flex items-center justify-center rounded-full ${size === 'lg' ? 'p-1' : ''}`}>
          <IconComponent size={iconSizes} aria-hidden="true" />
        </span>
      )}
      <span>{config.label}</span>
      {size === 'lg' && (
        <span className="text-xs font-normal normal-case opacity-80 border-l pl-2 border-current">
          {config.sublabel}
        </span>
      )}
    </span>
  );
};
