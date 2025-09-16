"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import { BiCategory, BiSolidDashboard } from "react-icons/bi";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdAddShoppingCart, MdLogout } from "react-icons/md";

const Sidebar = () => {
  const { signOut } = authClient;
  const router = useRouter();
  const handleLogout = () => {
    signOut();
    router.replace("/");
  };

  return (
    <aside className="flex flex-row lg:flex-col w-full lg:w-64 lg:min-h-screen bg-white border-t lg:border-t-0 lg:border-r border-gray-200 shadow-sm lg:shadow-none fixed bottom-0 lg:static z-50 lg:z-auto">
      <div className="hidden lg:block p-4 border-b border-gray-200">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
        >
          <AiOutlineHome className="text-2xl" />
          <span>AccessMart</span>
        </Link>
      </div>

      <nav className="flex flex-row lg:flex-col flex-1 lg:flex-initial">
        <Link
          href="/vendor"
          className="flex flex-1 lg:flex-initial flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-3 p-3 lg:px-6 lg:py-3 text-xs lg:text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 border-r lg:border-r-0 lg:border-b border-gray-200 last:border-r-0 lg:last:border-b"
        >
          <BiSolidDashboard className="text-lg lg:text-xl" />
          <span className="font-medium">Dashboard</span>
        </Link>

        <Link
          href="/vendor/category"
          className="flex flex-1 lg:flex-initial flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-3 p-3 lg:px-6 lg:py-3 text-xs lg:text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 border-r lg:border-r-0 lg:border-b border-gray-200 last:border-r-0 lg:last:border-b"
        >
          <BiCategory className="text-lg lg:text-xl" />
          <span className="font-medium">Category</span>
        </Link>

        <Link
          href="/vendor/sale"
          className="flex flex-1 lg:flex-initial flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-3 p-3 lg:px-6 lg:py-3 text-xs lg:text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 border-r lg:border-r-0 lg:border-b border-gray-200 last:border-r-0 lg:last:border-b"
        >
          <IoPricetagsOutline className="text-lg lg:text-xl" />
          <span className="font-medium">Sale</span>
        </Link>

        <Link
          href="/vendor/product"
          className="flex flex-1 lg:flex-initial flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-3 p-3 lg:px-6 lg:py-3 text-xs lg:text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 border-r lg:border-r-0 lg:border-b border-gray-200 last:border-r-0 lg:last:border-b"
        >
          <MdAddShoppingCart className="text-lg lg:text-xl" />
          <span className="font-medium">Product</span>
        </Link>

        {/* <Link
          href="/vendor/order"
          className="flex flex-1 lg:flex-initial flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-3 p-3 lg:px-6 lg:py-3 text-xs lg:text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 border-r lg:border-r-0 lg:border-b border-gray-200 last:border-r-0 lg:last:border-b"
        >
          <HiOutlineShoppingBag className="text-lg lg:text-xl" />
          <span className="font-medium">Orders</span>
        </Link> */}
      </nav>

      <div className="hidden lg:block mt-auto p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center justify-start gap-3 w-full px-6 py-3 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 rounded-lg"
        >
          <MdLogout className="text-xl" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
