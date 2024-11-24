"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import InnovatrLogo from "./innovatr-logo";
import { WalletButton } from "../solana/solana-provider";
import { ClusterUiSelect } from "../cluster/cluster-ui";

export function Navbar({}: {}) {
 const pathname = usePathname();
 const isProjectPage =
  pathname.startsWith("/market/") && pathname !== "/market";

 return (
  <div className="navbar bg-base-300/30 backdrop-blur-sm text-neutral-content flex-col md:flex-row space-y-2 md:space-y-0 border-b border-gradient-to-r from-transparent via-primary to-transparent z-40">
   <div className="flex-1">
    <ul className="menu menu-horizontal px-1 space-x-2">
     {isProjectPage && (
      <li>
       <Link href="/market" className="flex items-center gap-2">
        ← Back to Market
       </Link>
      </li>
     )}
    </ul>
   </div>
   <div className="flex-none space-x-2">
    <WalletButton />
    <ClusterUiSelect />
   </div>
  </div>
 );
}
