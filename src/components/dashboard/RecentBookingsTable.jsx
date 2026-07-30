import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const statusStyles = {
  Confirmed: 'bg-blue-50 text-blue-600',
  Pending: 'bg-yellow-50 text-yellow-600',
  'Checked-in': 'bg-green-50 text-green-600',
  'Checked-out': 'bg-gray-100 text-gray-600',
  Cancelled: 'bg-red-50 text-red-600',
}

function RecentBookingsTable({ bookings }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-gray-900">Recent Bookings</h3>
        <Link to="/bookings" className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-800">
          View all <ArrowUpRight size={14} />
        </Link>
      </div>

      {bookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                <th className="pb-3 font-medium">Booking ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Room</th>
                <th className="pb-3 font-medium">Check In</th>
                <th className="pb-3 font-medium">Check Out</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-3.5 text-gray-500">{b.id.slice(0, 8)}</td>
                  <td className="py-3.5 font-medium text-gray-800">{b.guestName || '—'}</td>
                  <td className="py-3.5 text-gray-600">{b.roomName || '—'}</td>
                  <td className="py-3.5 text-gray-600">{b.checkIn || '—'}</td>
                  <td className="py-3.5 text-gray-600">{b.checkOut || '—'}</td>
                  <td className="py-3.5 font-semibold text-gray-800">₹{b.totalAmount ?? 0}</td>
                  <td className="py-3.5">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[b.status] || 'bg-gray-100 text-gray-500'}`}>
                      {b.status || 'Unknown'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-10 text-center text-sm text-gray-400">No bookings yet</div>
      )}
    </div>
  )
}

export default RecentBookingsTable