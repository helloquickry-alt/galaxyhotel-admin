const dummyRecent = [
  { id: 'BK1001', guest: 'Rahul Deshmukh', hotel: 'The Grand Residency', status: 'Confirmed', amount: 4998 },
  { id: 'BK1002', guest: 'Priya Sharma', hotel: 'Nagpur Palace Inn', status: 'Pending', amount: 6598 },
  { id: 'BK1003', guest: 'Amit Verma', hotel: 'Amravati Lakeview Resort', status: 'Confirmed', amount: 2899 },
  { id: 'BK1004', guest: 'Sneha Patil', hotel: 'The Grand Residency', status: 'Cancelled', amount: 3999 },
]

const statusStyles = {
  Confirmed: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
}

function RecentBookings() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Recent Bookings</h3>
      <div className="space-y-3">
        {dummyRecent.map((b) => (
          <div key={b.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <div>
              <p className="text-sm font-medium text-gray-800">{b.guest}</p>
              <p className="text-xs text-gray-500">{b.hotel} • {b.id}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[b.status]}`}>
                {b.status}
              </span>
              <span className="text-sm font-semibold text-gray-800 w-16 text-right">₹{b.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentBookings