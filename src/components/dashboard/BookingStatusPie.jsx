import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const colors = {
  Confirmed: '#111827',
  Pending: '#9ca3af',
  'Checked-in': '#4b5563',
  'Checked-out': '#d1d5db',
  Cancelled: '#f3f4f6',
}

function BookingStatusPie({ statusCounts }) {
  const data = Object.entries(statusCounts)
    .filter(([, value]) => value > 0)
    .map(([name, value]) => ({ name, value, color: colors[name] }))

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full">
      <h3 className="font-semibold text-gray-900 mb-1">Booking Status</h3>
      <p className="text-xs text-gray-400 mb-4">Overall breakdown</p>

      {data.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={3}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #f3f4f6', fontSize: '13px' }} />
            </PieChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-2 gap-2 mt-2">
            {data.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-xs text-gray-600">{d.name} · {d.value}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="h-52 flex items-center justify-center text-sm text-gray-400">
          No bookings yet
        </div>
      )}
    </div>
  )
}

export default BookingStatusPie