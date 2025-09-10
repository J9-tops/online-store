"use client";

import { Button } from "@/components/ui/button";
import { openModal } from "@/redux/features/modals";
import { useDispatch } from "react-redux";

type Props = {
  type: "login" | "signup";
};

export default function AuthButtons({ type }: Props) {
  const dispatch = useDispatch();

  return type === "login" ? (
    <Button
      className="w-full"
      size="lg"
      onClick={() => dispatch(openModal("login"))}
    >
      Sign in
    </Button>
  ) : (
    <Button
      variant="outline"
      className="w-full"
      size="lg"
      onClick={() => dispatch(openModal("signup"))}
    >
      Create an account
    </Button>
  );
}
