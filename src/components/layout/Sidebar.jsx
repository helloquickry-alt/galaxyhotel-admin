import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Building2, BedDouble, CalendarCheck,
  LogOut, Sparkles, ChevronLeft, ChevronRight
} from 'lucide-react'
import { logoutAdmin } from '../../firebase/auth'

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Hotels', path: '/hotels', icon: Building2 },
  { name: 'Rooms', path: '/rooms', icon: BedDouble },
  { name: 'Bookings', path: '/bookings', icon: CalendarCheck },
]

function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logoutAdmin()
    navigate('/')
  }

  return (
    <aside
      className={`h-screen bg-gray-900 text-gray-300 flex flex-col fixed left-0 top-0 z-30 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-2 px-6 py-6 border-b border-gray-800 ${collapsed ? 'justify-center px-0' : ''}`}>
        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shrink-0">
          <Sparkles size={18} className="text-gray-900" />
        </div>
        {!collapsed && (
          <div className="flex flex-col leading-tight">
            <span className="text-white font-bold text-sm tracking-wide">GALAXY</span>
            <span className="text-[10px] text-gray-400 tracking-[0.15em]">ADMIN PANEL</span>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-gray-900 border border-gray-700 rounded-full flex items-center justify-center text-gray-300 hover:bg-gray-800 transition-colors"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path)
          return (
            <Link
              key={item.path}
              to={item.path}
              title={collapsed ? item.name : ''}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                collapsed ? 'justify-center px-0' : ''
              } ${
                isActive
                  ? 'bg-white text-gray-900'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon size={18} className="shrink-0" />
              {!collapsed && item.name}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 py-6 border-t border-gray-800">
        <button
          onClick={handleLogout}
          title={collapsed ? 'Logout' : ''}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white w-full transition-colors ${
            collapsed ? 'justify-center px-0' : ''
          }`}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && 'Logout'}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar