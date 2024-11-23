"use client";

import { ReactNode, Suspense, useState } from "react";
import Link from "next/link";
import InnovatrLogo from "./innovatr-logo";
import { FacebookIcon } from "./icons/facebook-icon";
import { TwitterIcon } from "./icons/twitter-icon";
import { TelegramIcon } from "./icons/telegram-icon";
import { InstagramIcon } from "./icons/instagram-icon";
import toast, { Toaster } from "react-hot-toast";
import { AccountChecker } from "../account/account-ui";
import { ClusterChecker, ExplorerLink } from "../cluster/cluster-ui";
import { Navbar } from "./navbar";
import { usePathname } from "next/navigation";

export function UiLayout({
  children,
  links,
}: {
  children: ReactNode;
  links: { label: string; path: string }[];
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex">
      <aside className={`${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-base-200 p-4 h-screen fixed left-0 overflow-y-auto border-r border-base-300`}>
          <div className="flex flex-col h-full relative">
            <button 
              onClick={() => setCollapsed(!collapsed)} 
              className="btn btn-circle btn-sm absolute -right-2 top-0"
            >
              {collapsed ? '→' : '←'}
            </button>
            <nav className={`flex-1 ${collapsed ? 'hidden' : ''}`}>
              <ul className="menu menu-vertical w-full">
                <li className="menu-title">Navigation</li>
                <li>
                  <Link href="/market" className={pathname === "/market" ? "active" : ""}>
                    The Stage
                  </Link>
                </li>
                <li>
                  <Link
                    href="/clusters"
                    className={pathname === "/clusters" ? "active" : ""}
                  >
                    Clusters
                  </Link>
                </li>
                <li>
                  <Link
                    href="/innovatr"
                    className={pathname === "/innovatr" ? "active" : ""}
                  >
                    Innovatr Program
                  </Link>
                </li>
                <li className="menu-title mt-4">Account</li>
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
            <div className={`mt-auto border-t border-base-300 pt-4 ${collapsed ? 'hidden' : ''}`}>
              <div className="px-4">
                <Link href="/" className="flex justify-center mb-6">
                  <InnovatrLogo className={collapsed ? "h-6" : "h-8"} />
                </Link>
                <h3 className="text-lg font-semibold mb-2">Contact</h3>
                <p className="text-sm text-base-content/70 mb-4">innovate@innovatr.io</p>
                <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com/profile.php?id=61553927551050" target="_blank" rel="noopener noreferrer" className="text-base-content/70 hover:text-primary">
                    <FacebookIcon />
                  </a>
                  <a href="https://x.com/innovatr_app" target="_blank" rel="noopener noreferrer" className="text-base-content/70 hover:text-primary">
                    <TwitterIcon />
                  </a>
                  <a href="https://t.me/innovatr_app" target="_blank" rel="noopener noreferrer" className="text-base-content/70 hover:text-primary">
                    <TelegramIcon />
                  </a>
                  <a href="https://www.instagram.com/innovatr.official/" target="_blank" rel="noopener noreferrer" className="text-base-content/70 hover:text-primary">
                    <InstagramIcon />
                  </a>
                </div>
                <div className="mt-4 text-xs text-center text-base-content/50">
                  <p>&copy; 2024 Innovatr. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <div className={`flex-1 ${collapsed ? 'ml-16' : 'ml-64'} transition-all duration-300 flex flex-col min-h-screen`}>
          <div className="sticky top-0 z-50">
            <Navbar links={links} />
            <ClusterChecker>
              <AccountChecker />
            </ClusterChecker>
          </div>
          <main className="flex-1 px-8 py-8">
          <Suspense
            fallback={
              <div className="text-center my-32">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            }
          >
            {children}
          </Suspense>
            <Toaster position="bottom-right" />
          </main>
        </div>
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
          {typeof subtitle === "string" ? <p className="py-6">{subtitle}</p> : subtitle}
          {children}
        </div>
      </div>
    </div>
  );
}

export function ellipsify(str = "", len = 4) {
  if (str.length > 30) {
    return str.substring(0, len) + ".." + str.substring(str.length - len, str.length);
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
