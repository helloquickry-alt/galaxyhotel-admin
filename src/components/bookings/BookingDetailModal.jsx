import { X, User, Phone, Mail, Calendar, Users, MapPin, IndianRupee } from 'lucide-react'

const statusStyles = {
  Confirmed: 'bg-blue-50 text-blue-600',
  Pending: 'bg-yellow-50 text-yellow-600',
  'Checked-in': 'bg-green-50 text-green-600',
  'Checked-out': 'bg-gray-100 text-gray-600',
  Cancelled: 'bg-red-50 text-red-600',
}

function BookingDetailModal({ booking, onClose }) {
  if (!booking) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 py-8 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 md:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-bold text-gray-800">Booking Details</h2>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[booking.status] || 'bg-gray-100 text-gray-500'}`}>
              {booking.status}
            </span>
          </div>
          <p className="text-sm text-gray-400">ID: {booking.id}</p>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <User size={16} className="text-gray-400" />
              <span className="text-gray-700 font-medium">{booking.guestName || '—'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone size={16} className="text-gray-400" />
              <span className="text-gray-700">{booking.phone || '—'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-gray-400" />
              <span className="text-gray-700">{booking.email || '—'}</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <MapPin size={16} className="text-gray-400" />
              <span className="text-gray-700">{booking.hotelName || '—'} — {booking.roomName || '—'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar size={16} className="text-gray-400" />
              <span className="text-gray-700">{booking.checkIn} → {booking.checkOut}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Users size={16} className="text-gray-400" />
              <span className="text-gray-700">{booking.guests} Guests</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Amount</span>
              <span className="font-semibold text-gray-800">₹{booking.totalAmount ?? 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Paid Amount</span>
              <span className="font-semibold text-green-600">₹{booking.paidAmount ?? 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Due Amount</span>
              <span className="font-semibold text-red-600">₹{booking.dueAmount ?? 0}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-lg transition"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default BookingDetailModal