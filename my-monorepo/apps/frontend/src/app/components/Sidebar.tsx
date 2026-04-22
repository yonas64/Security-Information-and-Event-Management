import { useMemo } from 'react';
import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  Shield,
  Settings,
  Users,
  FileBarChart,
  GitBranch,
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'logs', label: 'Log Management', icon: FileText },
  { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
  { id: 'threat-detection', label: 'Threat Detection', icon: Shield },
  { id: 'rules', label: 'Rules Engine', icon: GitBranch },
  { id: 'reports', label: 'Reports', icon: FileBarChart },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const renderedItems = useMemo(() => {
    return navItems.map((item) => {
      const Icon = item.icon;
      const isActive = currentPage === item.id;

      return (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`group relative w-full flex items-center gap-3 px-4 py-2.5 mb-1 rounded-xl transition-all duration-200 ease-in-out
            ${
              isActive
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-[#1a1a24]'
            }`}
        >
          {/* Active Indicator */}
          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-white rounded-r" />
          )}

          <Icon className={`size-5 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />

          <span className="text-sm font-medium tracking-wide">
            {item.label}
          </span>
        </button>
      );
    });
  }, [currentPage, onNavigate]);

  return (
    <aside className="w-64 h-screen bg-[#0f0f17] border-r border-[#1f1f2e] flex flex-col shadow-lg">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-[#1f1f2e]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-xl shadow">
            <Shield className="size-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-lg text-white leading-tight">SecureOps</h1>
            <p className="text-xs text-gray-400">SIEM Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2a2a3a]">
        {renderedItems}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#1f1f2e]">
        <div className="text-xs text-gray-500">
          <div className="flex justify-between">
            <span>Version</span>
            <span className="text-gray-300">2.4.1</span>
          </div>
          <div className="mt-1 text-center text-gray-600">© 2026 SecureOps</div>
        </div>
      </div>
    </aside>
  );
}
