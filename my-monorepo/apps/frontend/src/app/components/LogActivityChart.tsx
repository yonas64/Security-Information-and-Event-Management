import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

interface DataPoint {
  time: string;
  logs: number;
}

export function LogActivityChart() {
  const [data, setData] = useState<DataPoint[]>([
    { time: '00:00', logs: 45230 },
    { time: '04:00', logs: 32100 },
    { time: '08:00', logs: 67890 },
    { time: '12:00', logs: 89234 },
    { time: '16:00', logs: 102456 },
    { time: '20:00', logs: 95432 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev];
        const last = newData[newData.length - 1].logs;
        const newValue = Math.max(
          0,
          last + Math.floor((Math.random() - 0.3) * 10000)
        );

        newData.shift();

        const now = new Date();
        newData.push({
          time: now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          logs: newValue,
        });

        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#0f0f17] to-[#141420] border border-[#1f1f2e] p-6 rounded-2xl shadow-lg">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white tracking-wide">
            Real-time Log Activity
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Events per hour (live stream)
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#101018] px-3 py-1 rounded-full border border-[#1f1f2e]">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <div className="w-2 h-2 rounded-full bg-emerald-500 absolute" />
          <span className="text-xs text-gray-300 ml-1">Live</span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          
          <defs>
            <linearGradient id="colorLogs" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="#1f1f2e"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="time"
            stroke="#6b7280"
            tick={{ fontSize: 11 }}
            tickLine={false}
          />

          <YAxis
            stroke="#6b7280"
            tick={{ fontSize: 11 }}
            tickLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#11111a',
              border: '1px solid #2a2a3a',
              borderRadius: '12px',
              boxShadow: '0 0 20px rgba(0,0,0,0.4)',
              color: '#fff',
            }}
            labelStyle={{ color: '#9ca3af' }}
            formatter={(value: number) => [
              value.toLocaleString(),
              'Logs',
            ]}
          />

          {/* Area glow */}
          <Area
            type="monotone"
            dataKey="logs"
            stroke="none"
            fill="url(#colorLogs)"
          />

          {/* Main line */}
          <Line
            type="monotone"
            dataKey="logs"
            stroke="#6366f1"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 6,
              stroke: '#6366f1',
              strokeWidth: 2,
              fill: '#0f0f17',
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}