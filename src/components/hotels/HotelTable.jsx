import { Link } from 'react-router-dom'
import { Pencil, Trash2, Star, MapPin } from 'lucide-react'

function HotelTable({ hotels, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-400 bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 font-medium">Property</th>
              <th className="px-6 py-4 font-medium">Location</th>
              <th className="px-6 py-4 font-medium">Rooms</th>
              <th className="px-6 py-4 font-medium">Price/Night</th>
              <th className="px-6 py-4 font-medium">Rating</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="font-medium text-gray-800">{hotel.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} className="text-gray-400" />
                    {hotel.location}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{hotel.rooms}</td>
                <td className="px-6 py-4 font-medium text-gray-800">₹{hotel.price}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-gray-700">{hotel.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      hotel.status === 'Active'
                        ? 'bg-green-50 text-green-600'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {hotel.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/hotels/edit/${hotel.id}`}
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800 transition-colors"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      onClick={() => onDelete(hotel.id)}
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

export default HotelTable