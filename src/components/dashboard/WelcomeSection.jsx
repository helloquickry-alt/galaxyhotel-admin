import { TrendingUp, IndianRupee } from 'lucide-react'

function WelcomeSection() {
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="bg-gray-900 rounded-2xl p-8 mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full -mr-20 -mt-20 opacity-40" />
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Good Morning, Amit 👋</h2>
          <p className="text-gray-400 text-sm">Sunrise Resort · {today}</p>
        </div>

        <div className="flex gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <TrendingUp size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Occupancy</p>
              <p className="text-lg font-bold text-white">82%</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <IndianRupee size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Today's Revenue</p>
              <p className="text-lg font-bold text-white">₹48,500</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeSection