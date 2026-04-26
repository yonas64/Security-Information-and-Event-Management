import { Search, Bell, User, Activity } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  systemStatus: 'healthy' | 'critical';
}

export function Header({ systemStatus }: HeaderProps) {
  const [notificationCount] = useState(12);

  const isHealthy = systemStatus === 'healthy';

  return (
    <header className="h-16 bg-[#0b0b12]/90 backdrop-blur-md border-b border-[#1f1f2e] flex items-center justify-between px-6 shadow-lg">
      
      {/* 🔍 Search Bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500 group-focus-within:text-indigo-400 transition" />
          
          <input
            type="text"
            placeholder="Search logs, alerts, threats... (e.g. severity:critical)"
            className="w-full bg-[#14141d] border border-[#2a2a3a] pl-10 pr-4 py-2 text-sm text-white 
            placeholder:text-gray-500 rounded-lg
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
            transition-all duration-200"
          />
        </div>
      </div>

      {/* ⚡ Right Section */}
      <div className="flex items-center gap-4 ml-6">

        {/* 🟢 System Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#14141d] border border-[#2a2a3a]">
          <Activity className="size-4 text-gray-400" />
          
          <span className="text-xs text-gray-400">Status</span>

          <div className="flex items-center gap-1.5 ml-1">
            <div
              className={`size-2 rounded-full animate-pulse ${
                isHealthy
                  ? 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.9)]'
                  : 'bg-red-400 shadow-[0_0_10px_rgba(239,68,68,0.9)]'
              }`}
            />
            <span
              className={`text-xs font-semibold ${
                isHealthy ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {isHealthy ? 'Healthy' : 'Critical'}
            </span>
          </div>
        </div>

        {/* 🔔 Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-[#14141d] transition-all duration-200 group">
          <Bell className="size-5 text-gray-400 group-hover:text-white transition" />

          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold px-1.5 py-[2px] rounded-full shadow-md">
              {notificationCount > 99 ? '99+' : notificationCount}
            </span>
          )}
        </button>

        {/* 👤 User Profile */}
        <button className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-[#14141d] transition-all duration-200">
          
          <div className="size-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
            <User className="size-4 text-white" />
          </div>

          <div className="text-left leading-tight">
            <div className="text-sm text-white font-medium">Admin</div>
            <div className="text-xs text-gray-500">SOC Analyst</div>
          </div>
        </button>
      </div>
    </header>
  );
}