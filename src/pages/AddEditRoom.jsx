import { useParams } from 'react-router-dom'
import AdminLayout from '../components/layout/AdminLayout'
import RoomForm from '../components/rooms/RoomForm'

function AddEditRoom() {
  const { roomId } = useParams()

  return (
    <AdminLayout title={roomId ? 'Edit Room' : 'Add New Room'}>
      <RoomForm />
    </AdminLayout>
  )
}

export default AddEditRoom