"use client";

import RequireAuth from "@/features/auth/components/RequireAuth";


export default function RequireAdmin({
  children
}) {

  return (
    <RequireAuth allowedRoles={["admin"]}>
      {children}
    </RequireAuth>
  );
}