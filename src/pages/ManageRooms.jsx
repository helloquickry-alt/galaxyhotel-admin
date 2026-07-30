import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Loader2 } from 'lucide-react'
import AdminLayout from '../components/layout/AdminLayout'
import RoomTable from '../components/rooms/RoomTable'
import { getAllRooms, deleteRoom } from '../firebase/rooms'
import { getAllHotels } from '../firebase/hotels'

function ManageRooms() {
  const [rooms, setRooms] = useState([])
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [hotelFilter, setHotelFilter] = useState('All')

  const fetchData = async () => {
    setLoading(true)
    const [roomsResult, hotelsResult] = await Promise.all([getAllRooms(), getAllHotels()])
    if (roomsResult.success) setRooms(roomsResult.rooms)
    if (hotelsResult.success) setHotels(hotelsResult.hotels)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      const result = await deleteRoom(id)
      if (result.success) {
        setRooms(rooms.filter((r) => r.id !== id))
      } else {
        alert('Failed to delete: ' + result.error)
      }
    }
  }

  const filteredRooms = rooms.filter((r) => {
    const matchesSearch = r.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesHotel = hotelFilter === 'All' || r.hotelId === hotelFilter
    return matchesSearch && matchesHotel
  })

  return (
    <AdminLayout title="Manage Rooms">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-lg px-4 py-2.5 w-full sm:w-64">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none text-sm text-gray-700 bg-transparent w-full"
            />
          </div>

          <select
            value={hotelFilter}
            onChange={(e) => setHotelFilter(e.target.value)}
            className="border border-gray-100 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none bg-white"
          >
            <option value="All">All Hotels</option>
            {hotels.map((h) => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>
        </div>

        <Link
          to="/rooms/add"
          className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={18} />
          Add New Room
        </Link>
      </div>

      <div className="mb-6">
        <div className="bg-white rounded-xl border border-gray-100 p-4 w-fit">
          <p className="text-2xl font-bold text-gray-900">{rooms.length}</p>
          <p className="text-xs text-gray-500">Total Rooms</p>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 flex items-center justify-center">
          <Loader2 className="animate-spin text-gray-400" size={28} />
        </div>
      ) : filteredRooms.length > 0 ? (
        <RoomTable rooms={filteredRooms} hotels={hotels} onDelete={handleDelete} />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400">
          No rooms found. Click "Add New Room" to create one.
        </div>
      )}
    </AdminLayout>
  )
}

export default ManageRooms