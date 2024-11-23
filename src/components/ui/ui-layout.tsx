"use client";

import { ReactNode, Suspense } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { AccountChecker } from "../account/account-ui";
import { ClusterChecker, ExplorerLink } from "../cluster/cluster-ui";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { usePathname } from "next/navigation";

export function UiLayout({
 children,
 links,
}: {
 children: ReactNode;
 links: { label: string; path: string }[];
}) {
 const pathname = usePathname();

 const AccountSidebar = () => (
  <aside className="w-64 bg-base-200 p-4 rounded-lg h-[calc(100vh-180px)] sticky top-24">
   <nav>
    <ul className="menu menu-vertical w-full">
     <li>
      <Link href="/account" className={pathname === "/account" ? "active" : ""}>
       Overview
      </Link>
     </li>
     <li>
      <Link
       href="/account/projects"
       className={pathname === "/account/projects" ? "active" : ""}
      >
       Projects
      </Link>
     </li>
     <li>
      <Link
       href="/account/investments"
       className={pathname === "/account/investments" ? "active" : ""}
      >
       Investments
      </Link>
     </li>
     <li>
      <Link
       href="/account/settings"
       className={pathname === "/account/settings" ? "active" : ""}
      >
       Settings
      </Link>
     </li>
    </ul>
   </nav>
  </aside>
 );

 return (
  <div className="min-h-screen flex flex-col">
   <Navbar links={links} />
   <ClusterChecker>
    <AccountChecker />
   </ClusterChecker>
   <main className="flex-1 mx-4 lg:mx-auto pb-16 mt-24 max-w-7xl">
    {pathname?.startsWith("/account") ? (
     <div className="flex gap-8">
      <AccountSidebar />
      <div className="flex-1">
       <Suspense
        fallback={
         <div className="text-center my-32">
          <span className="loading loading-spinner loading-lg"></span>
         </div>
        }
       >
        {children}
       </Suspense>
      </div>
     </div>
    ) : (
     <div>
      <Suspense
       fallback={
        <div className="text-center my-32">
         <span className="loading loading-spinner loading-lg"></span>
        </div>
       }
      >
       {children}
      </Suspense>
     </div>
    )}
    <Toaster position="bottom-right" />
   </main>
   <Footer />
  </div>
 );
}

export function AppHero({
 children,
 title,
 subtitle,
}: {
 children?: ReactNode;
 title: ReactNode;
 subtitle: ReactNode;
}) {
 return (
  <div className="hero py-[64px]">
   <div className="hero-content text-center">
    <div className="max-w-2xl">
     {typeof title === "string" ? (
      <h1 className="text-5xl font-bold">{title}</h1>
     ) : (
      title
     )}
     {typeof subtitle === "string" ? (
      <p className="py-6">{subtitle}</p>
     ) : (
      subtitle
     )}
     {children}
    </div>
   </div>
  </div>
 );
}

export function ellipsify(str = "", len = 4) {
 if (str.length > 30) {
  return (
   str.substring(0, len) + ".." + str.substring(str.length - len, str.length)
  );
 }
 return str;
}

export function useTransactionToast() {
 return (signature: string) => {
  toast.success(
   <div className="text-center">
    <div className="text-lg">Transaction sent</div>
    <ExplorerLink
     path={`tx/${signature}`}
     label="View Transaction"
     className="btn btn-xs btn-primary"
    />
   </div>
  );
 };
}
