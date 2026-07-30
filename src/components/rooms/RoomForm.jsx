import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Upload, X, Loader2, Plus } from 'lucide-react'
import { getRoomById, addRoom, updateRoom } from '../../firebase/rooms'
import { getAllHotels } from '../../firebase/hotels'

function RoomForm() {
  const navigate = useNavigate()
  const { roomId } = useParams()
  const isEditMode = Boolean(roomId)

  const [hotels, setHotels] = useState([])
  const [formData, setFormData] = useState({
    hotelId: '',
    name: '',
    price: '',
    capacity: '',
    size: '',
    image: '',
    amenities: [],
  })
  const [amenityInput, setAmenityInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const hotelsResult = await getAllHotels()
      if (hotelsResult.success) setHotels(hotelsResult.hotels)

      if (isEditMode) {
        const roomResult = await getRoomById(roomId)
        if (roomResult.success) {
          setFormData({
            hotelId: roomResult.room.hotelId || '',
            name: roomResult.room.name || '',
            price: roomResult.room.price || '',
            capacity: roomResult.room.capacity || '',
            size: roomResult.room.size || '',
            image: roomResult.room.image || '',
            amenities: roomResult.room.amenities || [],
          })
        }
      }
      setFetching(false)
    }
    fetchData()
  }, [roomId, isEditMode])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const addAmenity = () => {
    if (amenityInput.trim()) {
      setFormData({ ...formData, amenities: [...formData.amenities, amenityInput.trim()] })
      setAmenityInput('')
    }
  }

  const removeAmenity = (index) => {
    setFormData({ ...formData, amenities: formData.amenities.filter((_, i) => i !== index) })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.hotelId) {
      setError('Please select a hotel for this room.')
      return
    }

    setLoading(true)

    const payload = {
      ...formData,
      price: Number(formData.price),
      capacity: Number(formData.capacity),
    }

    const result = isEditMode
      ? await updateRoom(roomId, payload)
      : await addRoom(payload)

    setLoading(false)

    if (result.success) {
      navigate('/rooms')
    } else {
      setError('Failed to save room: ' + result.error)
    }
  }

  if (fetching) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-16 flex items-center justify-center">
        <Loader2 className="animate-spin text-gray-400" size={28} />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
      <button
        onClick={() => navigate('/rooms')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Rooms
      </button>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Hotel</label>
          <select
            name="hotelId"
            value={formData.hotelId}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400"
            required
          >
            <option value="">Choose a hotel</option>
            {hotels.map((h) => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Room Image</label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
            {formData.image ? (
              <div className="relative inline-block">
                <img src={formData.image} alt="Preview" className="h-40 rounded-lg object-cover mx-auto" />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: '' })}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <Upload size={28} />
                <p className="text-sm">Paste an image URL below for now</p>
              </div>
            )}
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="mt-4 w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Room Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Deluxe Room"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Price per Night (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="2499"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Capacity (Guests)</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="2"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Room Size</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="e.g. 250 sq ft"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Amenities</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={amenityInput}
              onChange={(e) => setAmenityInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addAmenity()
                }
              }}
              placeholder="e.g. Free WiFi"
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400"
            />
            <button
              type="button"
              onClick={addAmenity}
              className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <Plus size={16} />
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.amenities.map((amenity, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full"
              >
                {amenity}
                <button type="button" onClick={() => removeAmenity(i)}>
                  <X size={12} className="text-gray-500 hover:text-red-500" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {isEditMode ? 'Update Room' : 'Add Room'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/rooms')}
            className="border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default RoomForm