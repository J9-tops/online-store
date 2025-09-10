"use client";

import { AuthModalWrapper } from "@/components/AuthModalWrapper";
import { QueryProviders } from "@/components/QueryProvider";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryProviders>
        <AuthModalWrapper />
        {children}
      </QueryProviders>
    </Provider>
  );
};

export default ReduxProvider;
