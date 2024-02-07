"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams()!;
  let callbackUrl = searchParams.get("callbackUrl")!;

  if (callbackUrl === null) {
    callbackUrl = "/home";
  }

  return (
    <p
      onClick={async () => {
        setLoading(true);
        await signIn("google", { callbackUrl });
      }}
      className="group flex items-center justify-between pl-4 flex-1 cursor-pointer py-2 my-4 rounded-lg text-center bg-slate-200
      "
    >
      <FcGoogle className={`${loading ? "animate-spin" : ""} align-text-top w-10 h-auto `} />
      <span className="transition ease-in-out delay-100 group-hover:scale-110"> Entrar com Google</span>
      <span></span>
    </p>
  );
};

export default GoogleButton;
