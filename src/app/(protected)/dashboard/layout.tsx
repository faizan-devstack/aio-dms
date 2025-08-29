"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Poppins } from 'next/font/google';
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";
import { Provider, useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "@/redux/global/loaderSlice";
import { RootState, store } from "@/redux/store";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

// Create a separate component for the layout logic
const DashboardLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    dispatch(showLoader());
    const timeout = setTimeout(() => dispatch(hideLoader()), 1000);
    return () => clearTimeout(timeout);
  }, [pathname, searchParams, dispatch]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main
          className={`rounded-tl-lg flex-1 transition-all duration-300 mt-[48px] w-full overflow-auto ${isSidebarOpen ? "ml-[250px]" : "ml-12"
            }`}
        >
          {isLoading && <Loader />}
          {children}
        </main>
      </div>
    </div>
  );
};

// Wrap the layout content with the Provider
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-[#e2f0e7] text-[#2f2f2f]`}>
        <Provider store={store}>
          <DashboardLayoutContent>{children}</DashboardLayoutContent>
        </Provider>
      </body>
    </html>
  );
}