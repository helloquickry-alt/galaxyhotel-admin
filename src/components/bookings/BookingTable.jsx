import { Eye, LogIn, LogOut, XCircle, Trash2, Loader2 } from 'lucide-react'
import { useState } from 'react'

const statusStyles = {
  Confirmed: 'bg-blue-50 text-blue-600',
  Pending: 'bg-yellow-50 text-yellow-600',
  'Checked-in': 'bg-green-50 text-green-600',
  'Checked-out': 'bg-gray-100 text-gray-600',
  Cancelled: 'bg-red-50 text-red-600',
}

const paymentStyles = {
  Paid: 'bg-green-50 text-green-600',
  Partial: 'bg-yellow-50 text-yellow-600',
  Unpaid: 'bg-red-50 text-red-600',
}

function BookingTable({ bookings, onDelete, onView, onStatusChange, onCheckIn }) {
  const [actionLoadingId, setActionLoadingId] = useState(null)

  const handleStatusChange = async (id, status) => {
    setActionLoadingId(id)
    await onStatusChange(id, status)
    setActionLoadingId(null)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm whitespace-nowrap">
          <thead>
            <tr className="text-left text-xs text-gray-400 bg-gray-50 border-b border-gray-100">
              <th className="px-5 py-4 font-medium">Booking ID</th>
              <th className="px-5 py-4 font-medium">Guest</th>
              <th className="px-5 py-4 font-medium">Room</th>
              <th className="px-5 py-4 font-medium">Check In</th>
              <th className="px-5 py-4 font-medium">Check Out</th>
              <th className="px-5 py-4 font-medium">Guests</th>
              <th className="px-5 py-4 font-medium">Total</th>
              <th className="px-5 py-4 font-medium">Due</th>
              <th className="px-5 py-4 font-medium">Source</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium">Payment</th>
              <th className="px-5 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="px-5 py-4 font-medium text-gray-800">{b.id.slice(0, 8)}</td>
                <td className="px-5 py-4">
                  <p className="font-medium text-gray-800">{b.guestName || '—'}</p>
                  <p className="text-xs text-gray-400">{b.phone || '—'}</p>
                </td>
                <td className="px-5 py-4 text-gray-600">{b.roomName || b.room || '—'}</td>
                <td className="px-5 py-4 text-gray-600">{b.checkIn || '—'}</td>
                <td className="px-5 py-4 text-gray-600">{b.checkOut || '—'}</td>
                <td className="px-5 py-4 text-gray-600">{b.guests ?? '—'}</td>
                <td className="px-5 py-4 font-medium text-gray-800">₹{b.totalAmount ?? 0}</td>
                <td className="px-5 py-4">
                  {b.dueAmount > 0 ? (
                    <span className="text-red-600 font-medium">₹{b.dueAmount}</span>
                  ) : (
                    <span className="text-gray-400">₹0</span>
                  )}
                </td>
                <td className="px-5 py-4 text-gray-600">{b.source || '—'}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[b.status] || 'bg-gray-100 text-gray-500'}`}>
                    {b.status || 'Unknown'}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${paymentStyles[b.paymentStatus] || 'bg-gray-100 text-gray-500'}`}>
                    {b.paymentStatus || 'Unknown'}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1">
                    {actionLoadingId === b.id ? (
                      <Loader2 size={16} className="animate-spin text-gray-400 mr-2" />
                    ) : (
                      <>
                        <button
                          title="View"
                          onClick={() => onView(b)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800"
                        >
                          <Eye size={15} />
                        </button>

                        {b.status !== 'Checked-in' && b.status !== 'Checked-out' && b.status !== 'Cancelled' && (
                          <button
                            title="Check In"
                            onClick={() => onCheckIn(b)}
                            className="p-1.5 hover:bg-green-50 rounded-lg text-gray-500 hover:text-green-600"
                          >
                            <LogIn size={15} />
                          </button>
                        )}

                        {b.status === 'Checked-in' && (
                          <button
                            title="Check Out"
                            onClick={() => handleStatusChange(b.id, 'Checked-out')}
                            className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800"
                          >
                            <LogOut size={15} />
                          </button>
                        )}

                        {b.status !== 'Cancelled' && b.status !== 'Checked-out' && (
                          <button
                            title="Cancel"
                            onClick={() => {
                              if (window.confirm('Cancel this booking?')) {
                                handleStatusChange(b.id, 'Cancelled')
                              }
                            }}
                            className="p-1.5 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600"
                          >
                            <XCircle size={15} />
                          </button>
                        )}

                        <button
                          title="Delete"
                          onClick={() => onDelete(b.id)}
                          className="p-1.5 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600"
                        >
                          <Trash2 size={15} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BookingTable