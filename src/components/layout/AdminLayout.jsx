import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

function AdminLayout({ children, title }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div
        className={`flex-1 min-h-screen bg-gray-50 transition-all duration-300 ${
          collapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <Header title={title} />
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout