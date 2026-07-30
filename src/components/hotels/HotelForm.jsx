import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Upload, X, Loader2 } from 'lucide-react'
import { getHotelById, addHotel, updateHotel } from '../../firebase/hotels'

function HotelForm() {
  const navigate = useNavigate()
  const { hotelId } = useParams()
  const isEditMode = Boolean(hotelId)

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    rooms: '',
    rating: '',
    status: 'Active',
    description: '',
    image: '',
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEditMode)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchHotel = async () => {
      if (isEditMode) {
        const result = await getHotelById(hotelId)
        if (result.success) {
          setFormData({
            name: result.hotel.name || '',
            location: result.hotel.location || '',
            price: result.hotel.price || '',
            rooms: result.hotel.rooms || '',
            rating: result.hotel.rating || '',
            status: result.hotel.status || 'Active',
            description: result.hotel.description || '',
            image: result.hotel.image || '',
          })
        }
        setFetching(false)
      }
    }
    fetchHotel()
  }, [hotelId, isEditMode])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const payload = {
      ...formData,
      price: Number(formData.price),
      rooms: Number(formData.rooms),
      rating: Number(formData.rating) || 0,
    }

    const result = isEditMode
      ? await updateHotel(hotelId, payload)
      : await addHotel(payload)

    setLoading(false)

    if (result.success) {
      navigate('/hotels')
    } else {
      setError('Failed to save hotel: ' + result.error)
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
        onClick={() => navigate('/hotels')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Hotels
      </button>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hotel Image</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Hotel Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. The Grand Residency"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Akola, Maharashtra"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Base Price (₹/night)</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Total Rooms</label>
            <input
              type="number"
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
              placeholder="8"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Rating (out of 5)</label>
            <input
              type="number"
              step="0.1"
              max="5"
              min="0"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="4.5"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Brief description about the property..."
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400 resize-none"
          />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {isEditMode ? 'Update Hotel' : 'Add Hotel'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/hotels')}
            className="border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default HotelForm