"use client";

import { openModal } from "@/redux/features/modals";
import { FiUser } from "react-icons/fi";
import { useDispatch } from "react-redux";

export default function LoginButton() {
  const dispatch = useDispatch();

  const openLoginModal = () => {
    dispatch(openModal("login"));
  };
  return (
    <button
      onClick={openLoginModal}
      className="flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md cursor-pointer hover:shadow-none hoverEffect"
    >
      <FiUser className="text-2xl text-darkBlue" />
      <div className="lg:flex flex-col hidden">
        <p className="text-xs">Account</p>
        <p className="font-semibold">Login</p>
      </div>
    </button>
  );
}
