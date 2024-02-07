"use client";

import Hamburger from "hamburger-react";
import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { BsPersonFill } from "react-icons/bs";
import { MdDeliveryDining } from "react-icons/md";

const MobileNav = () => {
  const [isOpen, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="flex max-w-full mx-auto sm:p-2 justify-between items-center lg:hidden p-1 cursor-pointer bg-slate-200">
      <div className="flex items-center transition ease-in-out delay-150 hover:scale-110">
        <h1 className=" font-semibold tracking-wider sm:text-lg z-[100]">
          <Link href="/home">
            <MdDeliveryDining className="w-12 h-12 fill-current text-red-600" />
            Delivo
          </Link>
        </h1>
      </div>
      <div className="z-[100] relative">
        <Hamburger size={25} label="Show menu" toggled={isOpen} toggle={setOpen} />
      </div>
      {isOpen && (
        <div className="flex absolute w-screen pt-32 bg-slate-200 z-50 inset-0 h-screen flex-col items-center cursor-pointer">
          {session ? (
            <>
              <p className="my-4 text-black  ">Signed in as {session.user?.email}</p>
              <p onClick={() => signOut()} className="bg-[#2c6e49] my-4 rounded-md p-2 px-4 mx-2 text-white">
                <BsPersonFill /> Logout
              </p>
            </>
          ) : (
            <div>
              <Link
                className="flex justify-center border w-60 my-5 text-center py-4 text-sm font-medium border-solid rounded-full px-6 border-green-700"
                href="/login"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <p>Log in</p>
              </Link>

              <Link
                className="flex justify-center border w-60 my-5 text-center py-4 text-sm font-medium border-solid rounded-full px-6 bg-green-700 text-white border-green-700"
                href="/register"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <p>Register</p>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default MobileNav;
