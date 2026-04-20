import { useState, useEffect } from 'react';
import { Search, Filter, Download, ChevronDown, ChevronRight } from 'lucide-react';
import { api, LogEntry as ApiLogEntry } from '../../api';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  source: string;
  message: string;
  details: Record<string, any>;
}

const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: '2026-02-18 14:32:45.234',
    level: 'ERROR',
    source: 'auth-service',
    message: 'Failed authentication attempt for user admin',
    details: {
      ip: '192.168.1.100',
      userAgent: 'Mozilla/5.0',
      attempts: 5,
    },
  },
  {
    id: '2',
    timestamp: '2026-02-18 14:32:43.122',
    level: 'INFO',
    source: 'firewall',
    message: 'Connection established from trusted IP',
    details: {
      ip: '10.0.1.45',
      port: 443,
      protocol: 'HTTPS',
    },
  },
  {
    id: '3',
    timestamp: '2026-02-18 14:32:41.567',
    level: 'WARN',
    source: 'ids-system',
    message: 'Suspicious pattern detected in HTTP request',
    details: {
      pattern: 'SQL_INJECTION',
      severity: 'medium',
      blocked: true,
    },
  },
  {
    id: '4',
    timestamp: '2026-02-18 14:32:39.890',
    level: 'INFO',
    source: 'web-server',
    message: 'GET /api/users 200 OK',
    details: {
      method: 'GET',
      path: '/api/users',
      status: 200,
      duration: '23ms',
    },
  },
  {
    id: '5',
    timestamp: '2026-02-18 14:32:37.456',
    level: 'DEBUG',
    source: 'database',
    message: 'Query executed successfully',
    details: {
      query: 'SELECT * FROM logs WHERE timestamp > ?',
      duration: '12ms',
      rows: 1247,
    },
  },
];

export function LogManagementPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLog, setSelectedLog] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const params: any = {
        limit: 50,
        offset: (currentPage - 1) * 50,
      };
      if (levelFilter !== 'all') {
        params.severity = levelFilter;
      }
      if (sourceFilter !== 'all') {
        params.source = sourceFilter;
      }
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }
      const response = await api.getLogs(params);
      const mappedLogs: LogEntry[] = response.logs.map((log: ApiLogEntry) => ({
        id: log._id,
        timestamp: new Date(log.timestamp).toISOString().replace('T', ' ').slice(0, -5),
        level: log.severity as 'INFO' | 'WARN' | 'ERROR' | 'DEBUG',
        source: log.source,
        message: log.event,
        details: log.payload || {},
      }));
      setLogs(mappedLogs);
      setTotalLogs(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch logs');
      // Fallback to mock data if API fails
      setLogs(mockLogs);
      setTotalLogs(mockLogs.length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [currentPage, levelFilter, sourceFilter, searchQuery]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR': return 'text-[#ef4444]';
      case 'WARN': return 'text-[#f59e0b]';
      case 'INFO': return 'text-[#3b82f6]';
      case 'DEBUG': return 'text-[#6b7280]';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="bg-[#0f0f17] border border-[#1f1f2e] p-6">
        <h2 className="text-xl font-medium text-white mb-4">Log Management</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-2">Search Query</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="source:firewall AND level:ERROR"
                className="w-full bg-[#1a1a24] border border-[#2a2a3a] pl-10 pr-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#4f46e5]"
              />
            </div>
          </div>

          {/* Level Filter */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Level</label>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="w-full bg-[#1a1a24] border border-[#2a2a3a] px-3 py-2 text-sm text-white focus:outline-none focus:border-[#4f46e5]"
            >
              <option value="all">All Levels</option>
              <option value="ERROR">ERROR</option>
              <option value="WARN">WARN</option>
              <option value="INFO">INFO</option>
              <option value="DEBUG">DEBUG</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-end gap-2">
            <button
              onClick={fetchLogs}
              className="flex-1 bg-[#4f46e5] hover:bg-[#4338ca] text-white px-4 py-2 text-sm flex items-center justify-center gap-2"
            >
              <Filter className="size-4" />
              Filter
            </button>
            <button className="px-4 py-2 bg-[#1a1a24] hover:bg-[#2a2a3a] border border-[#2a2a3a] text-white text-sm">
              <Download className="size-4" />
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Time Range</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full bg-[#1a1a24] border border-[#2a2a3a] px-3 py-2 text-sm text-white"
            >
              <option value="all">All Time</option>
              <option value="1h">Last 1 hour</option>
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Source</label>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full bg-[#1a1a24] border border-[#2a2a3a] px-3 py-2 text-sm text-white"
            >
              <option value="all">All Sources</option>
              <option value="firewall">Firewall</option>
              <option value="ids-system">IDS/IPS</option>
              <option value="web-server">Web Server</option>
              <option value="database">Database</option>
              <option value="auth-service">Auth Service</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Sort By</label>
            <select className="w-full bg-[#1a1a24] border border-[#2a2a3a] px-3 py-2 text-sm text-white">
              <option>Newest First</option>
              <option>Oldest First</option>
              <option>Severity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/20 border border-red-500/50 p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Log Results */}
      <div className="bg-[#0f0f17] border border-[#1f1f2e]">
        <div className="border-b border-[#1f1f2e] px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">
              Log Entries {loading ? '(Loading...)' : `(${totalLogs.toLocaleString()} results)`}
            </h3>
            <div className="text-sm text-gray-400">
              {loading ? 'Loading...' : `Showing ${logs.length} of ${totalLogs}`}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="px-6 py-8 text-center">
            <p className="text-gray-400">Loading logs...</p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-[#1f1f2e]">
              {logs.map((log) => (
            <div key={log.id} className="hover:bg-[#1a1a24] transition-colors">
              <div
                className="px-6 py-4 cursor-pointer"
                onClick={() => setSelectedLog(selectedLog === log.id ? null : log.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 pt-1">
                    {selectedLog === log.id ? (
                      <ChevronDown className="size-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="size-4 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-4 mb-2">
                      <span className="font-mono text-xs text-gray-500 whitespace-nowrap">
                        {log.timestamp}
                      </span>
                      <span className={`font-mono text-xs font-medium ${getLevelColor(log.level)} whitespace-nowrap`}>
                        {log.level}
                      </span>
                      <span className="font-mono text-xs text-[#8b5cf6] whitespace-nowrap">
                        {log.source}
                      </span>
                    </div>
                    <div className="text-sm text-white">
                      {log.message}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded JSON Details */}
              {selectedLog === log.id && (
                <div className="px-6 pb-4">
                  <div className="ml-8 bg-[#000000] border border-[#2a2a3a] p-4 overflow-x-auto">
                    <pre className="text-xs font-mono text-[#10b981]">
                      {JSON.stringify(log.details, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ))}
            </div>

            {/* Pagination */}
            <div className="border-t border-[#1f1f2e] px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-[#1a1a24] hover:bg-[#2a2a3a] disabled:opacity-50 disabled:cursor-not-allowed border border-[#2a2a3a] text-white text-sm"
                >
                  Previous
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">Page {currentPage}</span>
                </div>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={logs.length < 50}
                  className="px-4 py-2 bg-[#1a1a24] hover:bg-[#2a2a3a] disabled:opacity-50 disabled:cursor-not-allowed border border-[#2a2a3a] text-white text-sm"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
