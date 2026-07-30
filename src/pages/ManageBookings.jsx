import { useState, useEffect } from 'react'
import { Search, Download, FileSpreadsheet, Printer, Filter, Loader2 } from 'lucide-react'
import AdminLayout from '../components/layout/AdminLayout'
import BookingTable from '../components/bookings/BookingTable'
import BookingDetailModal from '../components/bookings/BookingDetailModal'
import CheckInModal from '../components/bookings/CheckInModal'
import { getAllBookings, deleteBooking, updateBookingStatus, checkInBooking } from '../firebase/bookings'

const statusFilters = ['All', 'Pending', 'Confirmed', 'Checked-in', 'Checked-out', 'Cancelled']

function ManageBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [checkInTarget, setCheckInTarget] = useState(null)

  const fetchBookings = async () => {
    setLoading(true)
    const result = await getAllBookings()
    if (result.success) {
      setBookings(result.bookings)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      const result = await deleteBooking(id)
      if (result.success) {
        setBookings(bookings.filter((b) => b.id !== id))
      } else {
        alert('Failed to delete: ' + result.error)
      }
    }
  }

  const handleStatusChange = async (id, status) => {
    const result = await updateBookingStatus(id, status)
    if (result.success) {
      setBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)))
    } else {
      alert('Failed to update status: ' + result.error)
    }
  }

  const handleCheckInConfirm = async (paymentData) => {
    const result = await checkInBooking(checkInTarget.id, paymentData)
    if (result.success) {
      setBookings(
        bookings.map((b) =>
          b.id === checkInTarget.id
            ? { ...b, status: 'Checked-in', ...paymentData }
            : b
        )
      )
      setCheckInTarget(null)
    } else {
      alert('Failed to check-in: ' + result.error)
    }
  }

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.guestName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone?.includes(searchTerm)
    const matchesFilter = activeFilter === 'All' || b.status === activeFilter
    return matchesSearch && matchesFilter
  })

  return (
    <AdminLayout title="All Bookings">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-lg px-4 py-2.5 w-full lg:w-80">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by guest, booking ID, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none text-sm text-gray-700 bg-transparent w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
            <Download size={16} />
            PDF
          </button>
          <button className="flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
            <FileSpreadsheet size={16} />
            Excel
          </button>
          <button className="flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
            <Printer size={16} />
            Print
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6 overflow-x-auto">
        <Filter size={16} className="text-gray-400 shrink-0" />
        {statusFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`text-xs font-medium px-3.5 py-2 rounded-full whitespace-nowrap transition-colors ${
              activeFilter === filter
                ? 'bg-gray-900 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
          <p className="text-xs text-gray-500">Total Bookings</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-2xl font-bold text-yellow-600">
            {bookings.filter((b) => b.status === 'Pending').length}
          </p>
          <p className="text-xs text-gray-500">Pending</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-2xl font-bold text-green-600">
            {bookings.filter((b) => b.status === 'Checked-in').length}
          </p>
          <p className="text-xs text-gray-500">Checked-in</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-2xl font-bold text-red-500">
            {bookings.filter((b) => b.status === 'Cancelled').length}
          </p>
          <p className="text-xs text-gray-500">Cancelled</p>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 flex items-center justify-center">
          <Loader2 className="animate-spin text-gray-400" size={28} />
        </div>
      ) : filteredBookings.length > 0 ? (
        <BookingTable
          bookings={filteredBookings}
          onDelete={handleDelete}
          onView={setSelectedBooking}
          onStatusChange={handleStatusChange}
          onCheckIn={setCheckInTarget}
        />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400">
          No bookings found yet.
        </div>
      )}

      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}

      {checkInTarget && (
        <CheckInModal
          booking={checkInTarget}
          onClose={() => setCheckInTarget(null)}
          onConfirm={handleCheckInConfirm}
        />
      )}
    </AdminLayout>
  )
}

export default ManageBookings