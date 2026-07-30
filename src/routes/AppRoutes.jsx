import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import ManageHotels from '../pages/ManageHotels'
import AddEditHotel from '../pages/AddEditHotel'
import ManageRooms from '../pages/ManageRooms'
import AddEditRoom from '../pages/AddEditRoom'
import ManageBookings from '../pages/ManageBookings'
import NotFound from '../pages/NotFound'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/hotels" element={<ManageHotels />} />
      <Route path="/hotels/add" element={<AddEditHotel />} />
      <Route path="/hotels/edit/:hotelId" element={<AddEditHotel />} />
      <Route path="/rooms" element={<ManageRooms />} />
      <Route path="/rooms/add" element={<AddEditRoom />} />
      <Route path="/rooms/edit/:roomId" element={<AddEditRoom />} />
      <Route path="/bookings" element={<ManageBookings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes