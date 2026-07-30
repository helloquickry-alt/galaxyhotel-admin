import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'

const chartData = {
  Week: [
    { label: 'Mon', revenue: 32000 }, { label: 'Tue', revenue: 41000 },
    { label: 'Wed', revenue: 38000 }, { label: 'Thu', revenue: 52000 },
    { label: 'Fri', revenue: 61000 }, { label: 'Sat', revenue: 74000 },
    { label: 'Sun', revenue: 48500 },
  ],
  Month: [
    { label: 'Week 1', revenue: 280000 }, { label: 'Week 2', revenue: 310000 },
    { label: 'Week 3', revenue: 295000 }, { label: 'Week 4', revenue: 340000 },
  ],
  Year: [
    { label: 'Feb', revenue: 920000 }, { label: 'Mar', revenue: 1050000 },
    { label: 'Apr', revenue: 980000 }, { label: 'May', revenue: 1140000 },
    { label: 'Jun', revenue: 1260000 }, { label: 'Jul', revenue: 1180000 },
  ],
  Today: [
    { label: '6AM', revenue: 2000 }, { label: '9AM', revenue: 8000 },
    { label: '12PM', revenue: 15000 }, { label: '3PM', revenue: 24000 },
    { label: '6PM', revenue: 38000 }, { label: '9PM', revenue: 48500 },
  ],
}

const tabs = ['Today', 'Week', 'Month', 'Year']

function RevenueChart() {
  const [active, setActive] = useState('Week')

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h3 className="font-semibold text-gray-900">Revenue Analytics</h3>
          <p className="text-xs text-gray-400 mt-0.5">Track your earnings over time</p>
        </div>
        <div className="flex gap-1 bg-gray-50 p-1 rounded-lg w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                active === tab ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={chartData[active]}>
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#111827" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#111827" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #f3f4f6', fontSize: '13px' }} />
          <Area type="monotone" dataKey="revenue" stroke="#111827" strokeWidth={2.5} fill="url(#revenueGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RevenueChart