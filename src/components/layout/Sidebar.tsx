'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SIDEBAR_ITEMS } from '@/config/nav'
import AdminLogo from '@/assets/adminlogo.svg'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-72 flex-col border-r bg-card">
      <div className="flex h-18 items-center border-b px-6 py-8">
        <Link className="flex items-center gap-2" href="/">
          <AdminLogo className="h-10 w-auto" />
          <span className="sr-only">Radio Copilot Admin</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        {/* Rest of the sidebar navigation */}
        {SIDEBAR_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              pathname === item.href
                ? 'bg-secondary text-secondary-foreground'
                : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  )
} 