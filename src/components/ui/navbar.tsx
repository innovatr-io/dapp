'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import InnovatrLogo from './innovatr-logo'
import {WalletButton} from '../solana/solana-provider'
import {ClusterUiSelect} from '../cluster/cluster-ui'

export function Navbar({ links }: { links: { label: string; path: string }[] }) {
  const pathname = usePathname()

  return (
    <div className="navbar bg-base-300/30 backdrop-blur-sm text-neutral-content flex-col md:flex-row space-y-2 md:space-y-0 border-b border-gradient-to-r from-transparent via-primary to-transparent">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl text-white" href="/">
          <InnovatrLogo className="h-4 md:h-6" />
        </Link>
        <ul className="menu menu-horizontal px-1 space-x-2">
          {links.map(({ label, path }) => (
            <li key={path}>
              <Link className={pathname.startsWith(path) ? 'active' : ''} href={path}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-none space-x-2">
        <WalletButton />
        <ClusterUiSelect />
      </div>
    </div>
  )
}
