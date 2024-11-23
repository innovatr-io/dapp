'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarLinks = [
  { label: 'Overview', path: '/account' },
  { label: 'Projects', path: '/account/projects' },
  { label: 'Investments', path: '/account/investments' },
  { label: 'Settings', path: '/account/settings' },
]

export function AccountLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex gap-8">
      <aside className="w-64 bg-base-200 p-4 rounded-lg h-[calc(100vh-180px)] sticky top-24">
        <nav>
          <ul className="menu menu-vertical w-full">
            {sidebarLinks.map(({ label, path }) => (
              <li key={path}>
                <Link
                  href={path}
                  className={pathname === path ? 'active' : ''}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
