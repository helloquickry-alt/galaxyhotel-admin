const statuses = [
  { label: 'Available', count: 18, color: 'bg-green-500', bg: 'bg-green-50', text: 'text-green-700' },
  { label: 'Occupied', count: 82, color: 'bg-gray-800', bg: 'bg-gray-50', text: 'text-gray-800' },
  { label: 'Maintenance', count: 4, color: 'bg-red-500', bg: 'bg-red-50', text: 'text-red-700' },
  { label: 'Cleaning', count: 6, color: 'bg-yellow-500', bg: 'bg-yellow-50', text: 'text-yellow-700' },
]

function RoomStatusOverview() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="font-semibold text-gray-900 mb-5">Room Status Overview</h3>
      <div className="grid grid-cols-2 gap-4">
        {statuses.map((s, i) => (
          <div key={i} className={`rounded-xl p-4 ${s.bg}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
              <span className={`text-xs font-medium ${s.text}`}>{s.label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.count}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RoomStatusOverview