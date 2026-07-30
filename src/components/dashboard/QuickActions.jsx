import { Plus, BedDouble, UserPlus, FileText } from 'lucide-react'

const actions = [
  { label: 'New Booking', icon: Plus },
  { label: 'Add Room', icon: BedDouble },
  { label: 'Add Customer', icon: UserPlus },
  { label: 'Generate Invoice', icon: FileText },
]

function QuickActions() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="font-semibold text-gray-900 mb-5">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((a, i) => (
          <button
            key={i}
            className="flex flex-col items-center justify-center gap-2 bg-gray-50 hover:bg-gray-900 hover:text-white text-gray-700 rounded-xl py-5 transition-colors group"
          >
            <a.icon size={20} />
            <span className="text-xs font-medium">{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuickActions