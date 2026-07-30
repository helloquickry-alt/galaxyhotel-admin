import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  { month: 'Feb', bookings: 32 },
  { month: 'Mar', bookings: 45 },
  { month: 'Apr', bookings: 38 },
  { month: 'May', bookings: 52 },
  { month: 'Jun', bookings: 61 },
  { month: 'Jul', bookings: 48 },
]

function BookingsChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Bookings Overview</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <Tooltip cursor={{ fill: '#f9fafb' }} />
          <Bar dataKey="bookings" fill="#111827" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BookingsChart