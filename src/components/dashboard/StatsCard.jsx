function StatsCard({ title, value, icon: Icon, trend, trendUp }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
          <Icon size={22} className="text-white" />
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-800 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  )
}

export default StatsCard