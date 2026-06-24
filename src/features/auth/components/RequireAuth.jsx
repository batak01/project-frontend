"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useAuth from "@/hooks/useAuth";

export default function RequireAuth({
  children,
  allowedRoles = [],
}) {

  const {
    auth,
    loading
  } = useAuth();

  const router = useRouter();

  const [checking, setChecking] = useState(true);

  useEffect(()=>{

    if(loading){
      return;
    }

    if(!auth?.accessToken){

      router.replace("/login");

      return;

    }

    if(
      allowedRoles.length &&
      !allowedRoles.includes(auth.user?.role)
    ){

      router.replace("/unauthorized");

      return;

    }

    setChecking(false);

  },[
    auth,
    loading,
    allowedRoles,
    router
  ]);

  if(
    loading ||
    checking
  ){

    return null;

  }

  return children;

}