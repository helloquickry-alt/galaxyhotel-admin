import { useParams } from 'react-router-dom'
import AdminLayout from '../components/layout/AdminLayout'
import HotelForm from '../components/hotels/HotelForm'

function AddEditHotel() {
  const { hotelId } = useParams()

  return (
    <AdminLayout title={hotelId ? 'Edit Hotel' : 'Add New Hotel'}>
      <HotelForm />
    </AdminLayout>
  )
}

export default AddEditHotel