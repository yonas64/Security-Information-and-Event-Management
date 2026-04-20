const API_BASE_URL = 'http://localhost:3000/api';

export interface LogEntry {
  _id: string;
  timestamp: string;
  severity: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  source: string;
  event: string;
  payload?: Record<string, any>;
}

export interface LogsResponse {
  logs: LogEntry[];
  total: number;
}

export const api = {
  async getLogs(params?: {
    limit?: number;
    offset?: number;
    severity?: string;
    source?: string;
    search?: string;
  }): Promise<LogsResponse> {
    const url = new URL(`${API_BASE_URL}/logs`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch logs: ${response.statusText}`);
    }
    const data = await response.json();
    return {
      data,
      total: data.length, // For now, since backend doesn't return total
    };
  },
};