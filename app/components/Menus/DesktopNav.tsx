"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { BsPersonFill } from "react-icons/bs";
import { MdDeliveryDining } from "react-icons/md";

const DesktopNav = () => {
  const { data: session } = useSession();

  return (
    <nav className={`hidden px-6 lg:flex justify-between items-center py-2 bg-slate-200`}>
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold">
          <Link href="/home">
            <MdDeliveryDining className="w-12 h-12 fill-current text-red-600" />
            Delivo
          </Link>
        </h1>
      </div>
      <div className="flex items-center cursor-pointer">
        {session ? (
          <>
            <p className="my-4 text-black  ">Signed in as {session.user?.email}</p>
            <p onClick={() => signOut()} className="bg-green-700 ml-6 my-4 rounded-md p-2 px-4 mx-2 text-white">
              <BsPersonFill /> Logout
            </p>
          </>
        ) : (
          <>
            {" "}
            <p className="border-[1px] mx-4 min-w-[168px] w-full text-center py-[10px] px-8 text-sm font-medium  border-solid rounded-[24px] border-green-700">
              <Link href="/login">Entrar</Link>
            </p>
            <p className="rounded-[24px] hover:bg-white hover:border-2 hover:text-green-700 hover:border-green-700 text-white font-medium text-sm shadow-button py-[10px] mx-4 min-w-[168px] w-full text-center bg-green-700 ">
              <Link href="/register">Cadastrar</Link>
            </p>
          </>
        )}
      </div>
    </nav>
  );
};

export default DesktopNav;
