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

 return (
  <div className="min-h-screen flex flex-col">
   <Navbar links={links} />
   <ClusterChecker>
    <AccountChecker />
   </ClusterChecker>
   <div className="flex flex-1">
    <aside className="w-64 bg-base-200 p-4 rounded-lg min-h-[calc(100vh-180px)] sticky top-24 mt-24 ml-4">
      <nav>
        <ul className="menu menu-vertical w-full">
          <li className="menu-title">Account</li>
          <li>
            <Link href="/account" className={pathname === "/account" ? "active" : ""}>
              Overview
            </Link>
          </li>
          <li>
            <Link href="/account/projects" className={pathname === "/account/projects" ? "active" : ""}>
              Projects
            </Link>
          </li>
          <li>
            <Link href="/account/investments" className={pathname === "/account/investments" ? "active" : ""}>
              Investments
            </Link>
          </li>
          <li>
            <Link href="/account/settings" className={pathname === "/account/settings" ? "active" : ""}>
              Settings
            </Link>
          </li>
          <li className="menu-title mt-4">Navigation</li>
          <li>
            <Link href="/market" className={pathname === "/market" ? "active" : ""}>
              The Stage
            </Link>
          </li>
          <li>
            <Link href="/clusters" className={pathname === "/clusters" ? "active" : ""}>
              Clusters
            </Link>
          </li>
          <li>
            <Link href="/innovatr" className={pathname === "/innovatr" ? "active" : ""}>
              Innovatr Program
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
    <main className="flex-1 mx-4 lg:mx-8 pb-16 mt-24">
      <Suspense
        fallback={
          <div className="text-center my-32">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        }
      >
        {children}
      </Suspense>
    </main>
   </div>
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
