"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { BsPersonFill } from "react-icons/bs";
import { MdDeliveryDining } from "react-icons/md";

const DesktopNav = () => {
  const { data: session } = useSession();

  return (
    <nav className={`hidden px-6 lg:flex justify-between items-center py-1 bg-slate-200`}>
      <div className="flex items-center transition ease-in-out delay-150 hover:scale-125">
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
              <BsPersonFill /> Sair
            </p>
          </>
        ) : (
          <>
            <Link
              className="group border mx-4 min-w-[168px] w-full text-center py-2 px-8 text-sm font-medium  border-solid rounded-full 
              border-green-700 hover:bg-green-700  transition ease-in-out hover:scale-110"
              href="/login"
            >
              <p className="transition ease-in-out group-hover:scale-125 group-hover:text-white">Entrar</p>
            </Link>
            <Link
              className="group rounded-full text-white font-medium text-sm shadow-button py-2 mx-4 min-w-[168px] w-full text-center 
              bg-green-700 hover:bg-green-800  hover:border-green-700 transition ease-in-out  hover:scale-110"
              href="/register"
            >
              <p className="transition ease-in-out group-hover:scale-125">Cadastrar</p>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default DesktopNav;
