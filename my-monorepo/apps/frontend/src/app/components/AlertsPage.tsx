import { useState } from 'react';
import { AlertTriangle, Clock, CheckCircle, XCircle, Eye, Search, ChevronDown, RefreshCw } from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'investigating' | 'resolved';
  timestamp: string;
  sourceIp: string;
  targetIp: string;
  description: string;
  recommendations: string[];
  detectedBy: string;
  affectedAssets: string[];
}

const mockAlerts: Alert[] = [
  {
    id: 'ALT-2026-001',
    title: 'SQL Injection Attack Detected',
    severity: 'critical',
    status: 'open',
    timestamp: '2026-02-18 14:32:45',
    sourceIp: '203.45.67.89',
    targetIp: '10.0.1.45',
    description: 'Multiple SQL injection attempts detected on web application endpoint /api/users. Attack signature matches known SQLi patterns. Immediate action required.',
    recommendations: [
      'Block source IP at firewall level',
      'Review application input validation',
      'Check for data exfiltration',
      'Update WAF rules',
    ],
    detectedBy: 'Web Application Firewall',
    affectedAssets: ['web-server-01', 'database-primary'],
  },
  {
    id: 'ALT-2026-002',
    title: 'Brute Force Attack on SSH',
    severity: 'high',
    status: 'investigating',
    timestamp: '2026-02-18 13:15:22',
    sourceIp: '192.168.1.100',
    targetIp: '10.0.1.23',
    description: 'Detected 1,234 failed SSH login attempts from single IP address within 5 minutes. Account lockout triggered.',
    recommendations: [
      'Implement fail2ban on SSH service',
      'Enable two-factor authentication',
      'Review access logs',
    ],
    detectedBy: 'IDS/IPS System',
    affectedAssets: ['ssh-server-01'],
  },
  {
    id: 'ALT-2026-003',
    title: 'Malware Signature Detected',
    severity: 'high',
    status: 'investigating',
    timestamp: '2026-02-18 12:45:11',
    sourceIp: '172.16.0.45',
    targetIp: '10.0.1.67',
    description: 'File download matches known malware signature. File quarantined automatically.',
    recommendations: [
      'Scan affected system for malware',
      'Review user activity',
      'Update antivirus definitions',
    ],
    detectedBy: 'Endpoint Protection',
    affectedAssets: ['workstation-045'],
  },
  {
    id: 'ALT-2026-004',
    title: 'DDoS Attack Pattern',
    severity: 'medium',
    status: 'resolved',
    timestamp: '2026-02-18 11:20:33',
    sourceIp: 'Multiple',
    targetIp: '10.0.1.1',
    description: 'Unusual traffic spike detected from 142 different IP addresses. DDoS mitigation activated.',
    recommendations: [
      'Monitor bandwidth usage',
      'Review CDN configuration',
    ],
    detectedBy: 'Network Monitor',
    affectedAssets: ['load-balancer-01'],
  },
];

export function AlertsPage() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | Alert['status']>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'timestamp' | 'severity'>('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredAlerts = mockAlerts
    .filter((alert) =>
      (statusFilter === 'all' || alert.status === statusFilter) &&
      (searchQuery === '' ||
        alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.id.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'timestamp') {
        const dateA = new Date(a.timestamp).getTime();
        const dateB = new Date(b.timestamp).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }
      return sortOrder === 'asc'
        ? severityOrder[a.severity] - severityOrder[b.severity]
        : severityOrder[b.severity] - severityOrder[a.severity];
    });

  const handleRefresh = () => {
    setStatusFilter('all');
    setSearchQuery('');
    setSortBy('timestamp');
    setSortOrder('desc');
    setSelectedAlert(null);
  };

  const severityOrder: Record<Alert['severity'], number> = {
    critical: 4,
    high: 3,
    medium: 2,
    low: 1,
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-[#ef4444] text-white';
      case 'high':
        return 'bg-[#f59e0b] text-white';
      case 'medium':
        return 'bg-[#eab308] text-white';
      default:
        return 'bg-[#3b82f6] text-white';
    }
  };

  const getSeverityBorderColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'border-l-[#ef4444]';
      case 'high':
        return 'border-l-[#f59e0b]';
      case 'medium':
        return 'border-l-[#eab308]';
      default:
        return 'border-l-[#3b82f6]';
    }
  };

  const getStatusIcon = (status: Alert['status']) => {
    switch (status) {
      case 'open':
        return <XCircle className="size-4 text-[#ef4444]" />;
      case 'investigating':
        return <Clock className="size-4 text-[#f59e0b]" />;
      case 'resolved':
        return <CheckCircle className="size-4 text-[#10b981]" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-[#1f1f2e] bg-[#0f0f17] p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Security Alerts</h2>
            <p className="mt-1 text-sm text-gray-400">Monitor and manage security incidents.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-sm text-gray-400">
              <span className="h-2 w-2 rounded-full bg-[#ef4444] animate-pulse" />
              {mockAlerts.filter((alert) => alert.status === 'open').length} Open Alerts
            </span>
            <button
              type="button"
              onClick={handleRefresh}
              className="rounded-2xl border border-[#2a2a3a] bg-[#1a1a24] p-2 text-gray-400 transition hover:border-[#4f46e5] hover:text-white"
              title="Reset filters"
            >
              <RefreshCw className="size-4" />
            </button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="relative block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search alerts by title, description, or ID..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-2xl border border-[#2a2a3a] bg-[#1a1a24] py-2 pl-10 pr-4 text-sm text-white outline-none transition focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/30"
            />
          </label>

          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as 'timestamp' | 'severity')}
                className="rounded-2xl border border-[#2a2a3a] bg-[#1a1a24] px-3 py-2 text-sm text-white outline-none transition focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/30"
              >
                <option value="timestamp">Timestamp</option>
                <option value="severity">Severity</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="flex items-center gap-2 rounded-2xl border border-[#2a2a3a] bg-[#1a1a24] px-3 py-2 text-sm text-gray-300 transition hover:border-[#4f46e5] hover:text-white"
            >
              <ChevronDown className={`size-4 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
              {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(['all', 'open', 'investigating', 'resolved'] as const).map((filter) => {
            const count = filter === 'all' ? mockAlerts.length : mockAlerts.filter((alert) => alert.status === filter).length;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setStatusFilter(filter)}
                className={`rounded-2xl px-4 py-2 text-sm transition ${
                  statusFilter === filter ? 'bg-[#4f46e5] text-white' : 'bg-[#1a1a24] text-gray-400 hover:text-white'
                }`}
              >
                {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <article
              key={alert.id}
              onClick={() => setSelectedAlert(alert)}
              className={`rounded-2xl border border-[#1f1f2e] border-l-4 bg-[#0f0f17] p-6 shadow-sm transition duration-200 hover:shadow-lg ${getSeverityBorderColor(alert.severity)} ${
                selectedAlert?.id === alert.id ? 'ring-2 ring-[#4f46e5]' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="size-5 text-[#ef4444]" />
                  <div>
                    <h3 className="text-white font-semibold">{alert.title}</h3>
                    <p className="text-xs text-gray-500 font-mono mt-1">{alert.id}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs font-semibold uppercase ${getSeverityColor(alert.severity)}`}>
                  {alert.severity}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-400 line-clamp-2">{alert.description}</p>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
                <span className="font-mono">{alert.timestamp}</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(alert.status)}
                  <span className="capitalize">{alert.status}</span>
                </div>
                <button className="inline-flex items-center gap-1 text-[#4f46e5] transition hover:text-[#6366f1]">
                  <Eye className="size-3" />
                  View
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="lg:sticky lg:top-6">
          {selectedAlert ? (
            <div className="rounded-2xl border border-[#1f1f2e] bg-[#0f0f17] p-6 shadow-sm">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{selectedAlert.title}</h3>
                  <p className="text-sm text-gray-400 font-mono mt-1">{selectedAlert.id}</p>
                </div>
                <span className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase ${getSeverityColor(selectedAlert.severity)}`}>
                  {selectedAlert.severity}
                </span>
              </div>

              <div className="mb-6 rounded-3xl border border-[#f59e0b] bg-[#1a1a24] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b] animate-pulse" />
                  <span className="text-sm font-medium text-[#f59e0b]">Anomaly Detected</span>
                </div>
                <p className="text-xs text-gray-400">Pattern matching confidence: 94.7% | Risk score: High</p>
              </div>

              <div className="space-y-6 text-sm text-gray-400">
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-white">Description</h4>
                  <p>{selectedAlert.description}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-sm font-semibold text-white">Source IP</p>
                    <p className="font-mono text-sm text-gray-400">{selectedAlert.sourceIp}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-semibold text-white">Target IP</p>
                    <p className="font-mono text-sm text-gray-400">{selectedAlert.targetIp}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-semibold text-white">Detected By</p>
                    <p>{selectedAlert.detectedBy}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-semibold text-white">Status</p>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedAlert.status)}
                      <span className="capitalize text-gray-400">{selectedAlert.status}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold text-white">Affected Assets</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedAlert.affectedAssets.map((asset, index) => (
                      <span key={index} className="rounded-2xl border border-[#2a2a3a] bg-[#1a1a24] px-2 py-1 text-xs text-gray-400 font-mono">
                        {asset}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold text-white">Recommendations</p>
                  <ul className="space-y-2">
                    {selectedAlert.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="mt-1 text-[#4f46e5]">•</span>
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-3 pt-4 border-t border-[#1f1f2e] sm:grid-cols-2">
                  <button className="rounded-2xl bg-[#4f46e5] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4338ca]">Take Action</button>
                  <button className="rounded-2xl border border-[#2a2a3a] bg-[#1a1a24] px-4 py-3 text-sm font-semibold text-white transition hover:border-[#4f46e5] hover:text-white">Mark Resolved</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#1f1f2e] bg-[#0f0f17] p-12 text-center text-gray-400">
              <AlertTriangle className="size-12 mx-auto mb-4 text-gray-600" />
              <p>Select an alert to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
