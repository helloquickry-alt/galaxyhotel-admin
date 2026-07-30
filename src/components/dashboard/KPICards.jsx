import { IndianRupee, CalendarCheck, BedDouble, DoorOpen, LogIn, LogOut, CreditCard, XCircle } from 'lucide-react'

function KPICards({ stats }) {
  const kpis = [
    { title: "Today's Revenue", value: `₹${stats.todaysRevenue}`, icon: IndianRupee },
    { title: "Today's Bookings", value: stats.todaysBookingsCount, icon: CalendarCheck },
    { title: 'Rooms Occupied', value: `${stats.roomsOccupied}/${stats.totalRooms}`, icon: BedDouble },
    { title: 'Available Rooms', value: stats.availableRooms, icon: DoorOpen },
    { title: 'Check-ins Today', value: stats.checkinsToday, icon: LogIn },
    { title: 'Check-outs Today', value: stats.checkoutsToday, icon: LogOut },
    { title: 'Pending Payments', value: `₹${stats.pendingPayments}`, icon: CreditCard },
    { title: 'Cancelled Bookings', value: stats.cancelledCount, icon: XCircle },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      {kpis.map((kpi, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <kpi.icon size={18} className="text-white" />
            </div>
          </div>
          <p className="text-xl font-bold text-gray-900 mb-0.5">{kpi.value}</p>
          <p className="text-xs text-gray-500 font-medium">{kpi.title}</p>
        </div>
      ))}
    </div>
  )
}

export default KPICards