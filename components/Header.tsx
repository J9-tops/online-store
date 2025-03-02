import logo from "@/images/logo.png";
import { ClerkLoaded, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { BsBasket } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { HiOutlineDatabase } from "react-icons/hi";
import { RiAdminLine } from "react-icons/ri";
import CartIcon from "./CartIcon";
import ToggleMenu from "./ToggleMenu";

const Header = async () => {
  const user = await currentUser();
  const isAdmin = user?.publicMetadata?.role === "admin";
  const isVendor = user?.publicMetadata?.role === "vendor";

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-b-black py-1 text-black">
      <div className="w-full px-6">
        <div className="flex gap-2 justify-between items-center py-2 w-full">
          <div className="flex gap-3 items-center">
            <ToggleMenu />
            <Link href="/">
              <Image
                src={logo}
                alt="online store logo"
                className="w-20"
                priority
              />
            </Link>
          </div>
          <Form
            action="/search"
            className="hidden lg:block w-full flex-1 mx-4 mt-0 max-w-xl"
          >
            <input
              type="text"
              name="query"
              placeholder="search for products"
              className="bg-gray-50 text-gray-800 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-gray-200 w-full max-w-4xl rounded-md hoverEffect"
            />
          </Form>
          <div className="flex items-center space-x-4 sm:mt-0 flex-1 sm:flex-none">
            {!isAdmin && !isVendor && <CartIcon />}
            <ClerkLoaded>
              <SignedIn>
                {isAdmin && (
                  <Link
                    href={"/admin"}
                    className="h-10 flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect"
                  >
                    <RiAdminLine className="text-2xl text-darkBlue" />
                    <p className="font-semibold flex-col hidden lg:flex">
                      <span>Admin</span> <span>Panel</span>
                    </p>
                  </Link>
                )}

                {isVendor && (
                  <Link
                    href={"/vendor"}
                    className="h-10 flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect"
                  >
                    <HiOutlineDatabase className="text-2xl text-darkBlue" />
                    <p className="font-semibold hidden lg:block">
                      Vendor Panel
                    </p>
                  </Link>
                )}
                {/* remove orders if the person is a vendor or admin */}

                {!isAdmin && !isVendor && (
                  <Link
                    href={"/orders"}
                    className="h-10 flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect"
                  >
                    <BsBasket className="text-2xl text-darkBlue" />
                    <div className="lg:flex flex-col hidden">
                      <p className="text-xs">
                        <span className="font-semibold">0</span> items
                      </p>
                      <p className="font-semibold">Orders</p>
                    </div>
                  </Link>
                )}
              </SignedIn>
              {user ? (
                <div className="h-10 flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect">
                  <div className="hidden lg:block capitalize">
                    <UserButton showName />
                  </div>
                  <div className="lg:hidden">
                    <UserButton />
                  </div>
                </div>
              ) : (
                <SignInButton mode="modal">
                  <div className="h-10 flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md cursor-pointer hover:shadow-none hoverEffect">
                    <FiUser className="text-2xl text-darkBlue" />
                    <div className="lg:flex flex-col hidden">
                      <p className="text-xs">Account</p>
                      <p className="font-semibold">Login</p>
                    </div>
                  </div>
                </SignInButton>
              )}
            </ClerkLoaded>
          </div>
        </div>
        <Form action="/search" className="lg:hidden w-full my-2">
          <input
            type="text"
            name="query"
            placeholder="Search for products"
            className="bg-gray-50 text-gray-800 px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-gray-200 w-full max-w-4xl rounded-md hoverEffect"
          />
        </Form>
      </div>
    </header>
  );
};

export default Header;
