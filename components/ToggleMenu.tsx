"use client";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const ToggleMenu = () => {
  return (
    <button type="button">
      <RxHamburgerMenu className="lg:hidden" />{" "}
    </button>
  );
};

export default ToggleMenu;
