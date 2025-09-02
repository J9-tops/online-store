"use client";

import { LoginForm } from "@/components/LoginForm";
import { SignupForm } from "@/components/SignupForm";
import { closeModal } from "@/redux/features/modals";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

export function AuthModalWrapper() {
  const dispatch = useDispatch();
  const { isOpen, mode } = useSelector((state: RootState) => state.authModal);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4"
      onClick={handleClose}
    >
      <div
        className="bg-background rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto relative"
        onClick={handleModalContentClick}
      >
        {mode === "login" ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
}
