"use client";

import { AuthModalWrapper } from "@/components/AuthModalWrapper";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthModalWrapper />
      {children}
    </Provider>
  );
};

export default ReduxProvider;
