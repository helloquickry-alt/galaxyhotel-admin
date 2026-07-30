import { useState } from 'react'
import { Search, Bell, Sun, Menu, ChevronDown } from 'lucide-react'

function Header({ title }) {
  const [notifOpen, setNotifOpen] = useState(false)

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-800 lg:hidden">
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      </div>

      <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 w-72">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search bookings, guests, rooms..."
          className="bg-transparent outline-none text-sm w-full text-gray-700"
        />
      </div>

      <div className="flex items-center gap-5">
        <button className="text-gray-500 hover:text-gray-800">
          <Sun size={20} />
        </button>

        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative text-gray-500 hover:text-gray-800"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-lg border border-gray-100 p-3 z-30">
              <p className="text-sm font-semibold text-gray-800 px-2 py-1 mb-1">Notifications</p>
              <div className="space-y-1">
                <div className="px-2 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-600">
                  💳 Payment pending for BK1002
                </div>
                <div className="px-2 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-600">
                  📅 New booking received — Room 204
                </div>
                <div className="px-2 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-600">
                  🧹 Room 108 marked for cleaning
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            A
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-800 leading-tight">Amit</p>
            <p className="text-xs text-gray-400 leading-tight">Admin</p>
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
      </div>
    </header>
  )
}

export default Header