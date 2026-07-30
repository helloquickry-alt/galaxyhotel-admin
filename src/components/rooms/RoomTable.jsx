import { Pencil, Trash2, Users, Maximize } from 'lucide-react'
import { Link } from 'react-router-dom'

function RoomTable({ rooms, hotels, onDelete }) {
  const getHotelName = (hotelId) => {
    const hotel = hotels.find((h) => h.id === hotelId)
    return hotel ? hotel.name : 'Unknown Hotel'
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-400 bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 font-medium">Room</th>
              <th className="px-6 py-4 font-medium">Hotel</th>
              <th className="px-6 py-4 font-medium">Capacity</th>
              <th className="px-6 py-4 font-medium">Size</th>
              <th className="px-6 py-4 font-medium">Price/Night</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="font-medium text-gray-800">{room.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{getHotelName(room.hotelId)}</td>
                <td className="px-6 py-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users size={14} className="text-gray-400" />
                    {room.capacity} guests
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Maximize size={14} className="text-gray-400" />
                    {room.size}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">₹{room.price}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/rooms/edit/${room.id}`}
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800 transition-colors"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      onClick={() => onDelete(room.id)}
                      className="p-2 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
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

export default RoomTable