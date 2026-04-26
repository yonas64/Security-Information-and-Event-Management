import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  trend: string;
  icon: LucideIcon;
  iconColor?: string;
  borderColor?: string;
  pulsing?: boolean;
}

export function KPICard({
  title,
  value,
  trend,
  icon: Icon,
  iconColor = 'text-indigo-400',
  borderColor = 'border-indigo-500/50',
  pulsing,
}: KPICardProps) {
  const isPositive = trend.startsWith('+');
  const isNegative = trend.startsWith('-');

  return (
    <div
      className={`
        relative group
        bg-[#0b0b12]/80 backdrop-blur-md
        border border-[#1f1f2e] ${borderColor}
        rounded-xl p-5
        transition-all duration-300
        hover:scale-[1.02] hover:shadow-lg hover:shadow-black/30
        ${pulsing ? 'animate-pulse' : ''}
      `}
    >
      {/* subtle glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent blur-xl" />

      <div className="relative flex items-start justify-between">
        
        {/* Left */}
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
            {title}
          </p>

          <p className="text-3xl font-semibold text-white mb-2 tracking-tight">
            {value}
          </p>

          {/* Trend */}
          <div className="flex items-center gap-1 text-xs font-medium">
            {isPositive && <TrendingUp className="size-3 text-emerald-400" />}
            {isNegative && <TrendingDown className="size-3 text-red-400" />}
            {!isPositive && !isNegative && <Minus className="size-3 text-gray-400" />}

            <span
              className={
                isPositive
                  ? 'text-emerald-400'
                  : isNegative
                  ? 'text-red-400'
                  : 'text-gray-400'
              }
            >
              {trend}
            </span>

            <span className="text-gray-500 ml-1">vs yesterday</span>
          </div>
        </div>

        {/* Right Icon */}
        <div
          className={`
            relative flex items-center justify-center
            size-12 rounded-xl
            bg-gradient-to-br from-[#1a1a24] to-[#14141d]
            border border-[#2a2a3a]
            ${iconColor}
            shadow-inner
          `}
        >
          <Icon className="size-6" />

          {/* icon glow */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-indigo-500/10 blur-md" />
        </div>
      </div>
    </div>
  );
}