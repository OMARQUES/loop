"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
  const searchParams = useSearchParams()!;
  let callbackUrl = searchParams.get("callbackUrl")!;

  if (callbackUrl === null) {
    callbackUrl = "/home";
  }

  return (
    <p
      onClick={() => signIn("google", { callbackUrl })}
      className=" flex items-center justify-between pl-4 flex-1 cursor-pointer py-2 my-4 rounded-lg text-center bg-slate-200
                  transition ease-in-out delay-150 hover:scale-105"
    >
      <FcGoogle className="align-text-top w-10 h-auto" />
      <span> Entrar com Google</span>
      <span></span>
    </p>
  );
};

export default GoogleButton;
