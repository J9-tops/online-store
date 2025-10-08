import LoginButton from "@/components/LoginButton";
import logo from "@/images/logo.png";
import Form from "next/form";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { BsBasket } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { RiAdminLine } from "react-icons/ri";
import { auth } from "../lib/auth";
import CartIcon from "./CartIcon";
import ToggleMenu from "./ToggleMenu";
import { UserName } from "./UserName";

const Header = async () => {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-b-gray-300 py-1 text-black">
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
              placeholder="Search for products"
              className="bg-gray-50 cursor-text text-gray-800 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-gray-200 w-full max-w-4xl rounded-md hoverEffect"
            />
          </Form>
          <div className="flex items-center space-x-4 sm:mt-0 flex-1 sm:flex-none">
            <CartIcon />

            {session && session.user.role === "Admin" && (
              <Link
                href={"/admin"}
                className="h-[3.125rem] flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect"
              >
                <RiAdminLine className="text-2xl text-darkBlue" />
                <p className="font-semibold flex-col hidden lg:flex">
                  <span>Admin</span> <span>Panel</span>
                </p>
              </Link>
            )}

            {session && session.user.role === "Vendor" && (
              <Link
                href={"/vendor"}
                className="h-[3.125rem] flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect"
              >
                <HiOutlineDatabase className="text-2xl text-darkBlue" />
                <p className="font-semibold hidden lg:block">Vendor Panel</p>
              </Link>
            )}

            {session && session.user.role === "User" && (
              <Link
                href={"/orders"}
                className="h-[3.125rem] flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect"
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

            {session && <UserName user={session.user} />}
            {!session && <LoginButton />}
          </div>
        </div>
        <Form action="/search" className="lg:hidden w-full my-2">
          <input
            type="text"
            name="query"
            placeholder="Search for products"
            className="bg-gray-50 cursor-text text-gray-800 px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-gray-200 w-full max-w-4xl rounded-md hoverEffect"
          />
        </Form>
      </div>
    </header>
  );
};

export default Header;
