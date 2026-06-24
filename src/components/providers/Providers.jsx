"use client";

import {
  AuthProvider
} from "@/contexts/AuthContext";

import {
  Toaster
} from "react-hot-toast";

export default function Providers({
  children
}) {

  return (

    <AuthProvider>

      <Toaster
        position="top-right"
        toastOptions={{
          duration:3000,
        }}
      />

      {children}

    </AuthProvider>

  );

}