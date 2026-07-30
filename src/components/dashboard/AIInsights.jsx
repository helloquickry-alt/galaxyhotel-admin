import { Sparkles } from 'lucide-react'

const insights = [
  'Revenue likely to increase by 12% this weekend.',
  'Deluxe Rooms are selling fastest this month.',
  'Occupancy expected to reach 95% tomorrow.',
  'Consider increasing Suite Room price by 10%.',
  '4 bookings need payment follow-up.',
]

function AIInsights() {
  return (
    <div className="bg-gray-900 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <Sparkles size={18} className="text-white" />
        <h3 className="font-semibold text-white">AI Insights</h3>
      </div>
      <div className="space-y-3">
        {insights.map((insight, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300">
            💡 {insight}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AIInsights