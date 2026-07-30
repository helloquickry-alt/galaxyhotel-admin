import { collection, getDocs } from "firebase/firestore"
import { db } from "./config"

export const getDashboardStats = async () => {
  try {
    const hotelsSnap = await getDocs(collection(db, "hotels"))
    const bookingsSnap = await getDocs(collection(db, "bookings"))

    const hotels = hotelsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    const bookings = bookingsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    const todayStr = new Date().toISOString().split('T')[0]

    // Today's bookings (based on checkIn date)
    const todaysBookings = bookings.filter((b) => b.checkIn === todayStr)

    // Today's revenue (sum of totalAmount for bookings created today)
    const todaysRevenue = bookings
      .filter((b) => {
        if (!b.createdAt?.toDate) return false
        const created = b.createdAt.toDate().toISOString().split('T')[0]
        return created === todayStr
      })
      .reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0)

    const totalRooms = hotels.reduce((sum, h) => sum + (Number(h.rooms) || 0), 0)

    const checkedInCount = bookings.filter((b) => b.status === 'Checked-in').length
    const checkinsToday = bookings.filter((b) => b.checkIn === todayStr).length
    const checkoutsToday = bookings.filter((b) => b.checkOut === todayStr).length

    const pendingPayments = bookings
      .filter((b) => b.paymentStatus === 'Unpaid' || b.paymentStatus === 'Partial')
      .reduce((sum, b) => sum + (Number(b.dueAmount) || 0), 0)

    const cancelledCount = bookings.filter((b) => b.status === 'Cancelled').length

    const statusCounts = {
      Confirmed: bookings.filter((b) => b.status === 'Confirmed').length,
      Pending: bookings.filter((b) => b.status === 'Pending').length,
      'Checked-in': bookings.filter((b) => b.status === 'Checked-in').length,
      'Checked-out': bookings.filter((b) => b.status === 'Checked-out').length,
      Cancelled: cancelledCount,
    }

    const recentBookings = [...bookings]
      .sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0))
      .slice(0, 5)

    return {
      success: true,
      stats: {
        totalHotels: hotels.length,
        totalRooms,
        totalBookings: bookings.length,
        todaysRevenue,
        todaysBookingsCount: todaysBookings.length,
        roomsOccupied: checkedInCount,
        availableRooms: Math.max(totalRooms - checkedInCount, 0),
        checkinsToday,
        checkoutsToday,
        pendingPayments,
        cancelledCount,
        statusCounts,
        recentBookings,
      },
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}