import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import AdminLayout from '../components/layout/AdminLayout'
import WelcomeSection from '../components/dashboard/WelcomeSection'
import KPICards from '../components/dashboard/KPICards'
import RevenueChart from '../components/dashboard/RevenueChart'
import BookingStatusPie from '../components/dashboard/BookingStatusPie'
import RoomStatusOverview from '../components/dashboard/RoomStatusOverview'
import RecentBookingsTable from '../components/dashboard/RecentBookingsTable'
import QuickActions from '../components/dashboard/QuickActions'
import AIInsights from '../components/dashboard/AIInsights'
import { getDashboardStats } from '../firebase/dashboard'

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const result = await getDashboardStats()
      if (result.success) {
        setStats(result.stats)
      }
      setLoading(false)
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex items-center justify-center py-32">
          <Loader2 className="animate-spin text-gray-400" size={32} />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Dashboard">
      <WelcomeSection />
      <KPICards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <BookingStatusPie statusCounts={stats.statusCounts} />
      </div>

      <div className="mb-8">
        <RecentBookingsTable bookings={stats.recentBookings} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RoomStatusOverview />
        <QuickActions />
        <AIInsights />
      </div>
    </AdminLayout>
  )
}

export default Dashboard