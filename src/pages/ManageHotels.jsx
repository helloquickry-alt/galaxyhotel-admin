import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Loader2 } from 'lucide-react'
import AdminLayout from '../components/layout/AdminLayout'
import HotelTable from '../components/hotels/HotelTable'
import { getAllHotels, deleteHotel } from '../firebase/hotels'

function ManageHotels() {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchHotels = async () => {
    setLoading(true)
    const result = await getAllHotels()
    if (result.success) {
      setHotels(result.hotels)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchHotels()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      const result = await deleteHotel(id)
      if (result.success) {
        setHotels(hotels.filter((h) => h.id !== id))
      } else {
        alert('Failed to delete hotel: ' + result.error)
      }
    }
  }

  const filteredHotels = hotels.filter(
    (h) =>
      h.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.location?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AdminLayout title="Manage Hotels">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-lg px-4 py-2.5 w-full sm:w-80">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search hotels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none text-sm text-gray-700 bg-transparent w-full"
          />
        </div>

        <Link
          to="/hotels/add"
          className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={18} />
          Add New Hotel
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-2xl font-bold text-gray-900">{hotels.length}</p>
          <p className="text-xs text-gray-500">Total Properties</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-2xl font-bold text-green-600">
            {hotels.filter((h) => h.status === 'Active').length}
          </p>
          <p className="text-xs text-gray-500">Active</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-2xl font-bold text-gray-400">
            {hotels.filter((h) => h.status === 'Inactive').length}
          </p>
          <p className="text-xs text-gray-500">Inactive</p>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 flex items-center justify-center">
          <Loader2 className="animate-spin text-gray-400" size={28} />
        </div>
      ) : filteredHotels.length > 0 ? (
        <HotelTable hotels={filteredHotels} onDelete={handleDelete} />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400">
          No hotels found. Click "Add New Hotel" to create one.
        </div>
      )}
    </AdminLayout>
  )
}

export default ManageHotels