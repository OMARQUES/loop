"use client";

import styles from "./Form.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { BsArrowRightCircleFill } from "react-icons/bs";
import GoogleButton from "../GoogleButton";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { log } from "console";

type Inputs = {
  email: string;
  fullName: string;
  password: string;
};

const errorMessages = {
  required: "Preencha esse campo",
  email: "Email invalido",
  passwordMinLength: "Senha deve ter no minimo 8 caracteres",
  passwordMaxLength: "Senha deve ter até 32 caracteres",
  passwordPattern: "A senha deve letras minusculas, maiusculas, numeros e caracter especial",
};

const Form = () => {
  const router = useRouter();
  const session = useSession();

  if (session.status === "authenticated") {
    router?.push("/home");
  }

  const schema = z.object({
    email: z.string().min(1, { message: errorMessages.required }).email({ message: errorMessages.email }),
    fullName: z.string().min(1, { message: errorMessages.required }),
    password: z
      .string()
      .min(8, { message: errorMessages.passwordMinLength })
      .max(32, { message: errorMessages.passwordMaxLength })
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,16}$/, {
        message: "A senha deve conter letras minusculas, maiusculas, numeros e caracter especial",
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
    },
  });

  const formSubmit: SubmitHandler<Inputs> = async (form, e) => {
    const { fullName, email, password } = form;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      if (res.status === 501) {
        {
          toast.error(res.statusText);
        }
      }

      res.status === 201 && router.push("/login?success=Account has been created");
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      autoComplete="off"
      className={`${styles.form_container} flex justify-center items-center flex-col`}
    >
      <h2 className={`leading-[1.15] mt-12 mx-auto w-full  px-2 text-xl my-6 sm:text-2xl font-semibold  font-Poppins`}>
        Cadastro
      </h2>

      <fieldset className="w-full px-2 flex justify-center items-center flex-col">
        <label className="w-full" htmlFor="username">
          Nome
        </label>
        <input
          {...register("fullName")}
          placeholder="Seu nome"
          type="text"
          autoComplete="false"
          className=" w-full   border-solid border border-slate-200 focus:ring focus:ring-slate-300 rounded-full"
        />
        {errors.fullName?.message && <small className="block text-red-600 w-full">{errors.fullName.message}</small>}
      </fieldset>

      <fieldset className="w-full px-2 mt-5 flex justify-center items-center flex-col">
        <label className="w-full" htmlFor="email">
          Email
        </label>
        <input
          {...register("email")}
          placeholder="email@exemplo.com"
          type="email"
          autoComplete="off"
          className=" w-full   border-solid border border-slate-200 focus:ring focus:ring-slate-300 rounded-full"
        />
        {errors.email?.message && <small className="block text-red-600 w-full">{errors.email.message}</small>}
      </fieldset>

      <fieldset className="w-full px-2 mt-5 flex justify-center items-center flex-col">
        <label className="w-full" htmlFor="password">
          Senha
        </label>
        <input
          {...register("password")}
          placeholder="***********"
          type="password"
          autoComplete="new-password"
          className=" w-full   border-solid border border-slate-200 focus:ring focus:ring-slate-300 rounded-full"
        />
        {errors.password?.message && <small className="block text-red-600 w-full">{errors.password.message}</small>}
      </fieldset>

      <div className="flex flex-col justify-center w-full items-center px-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full group flex justify-center items-center text-center flex-1 mt-6 bg-green-700 text-white cursor-pointer rounded-md p-[1rem] px-4  
                       transition ease-in-out delay-150 hover:scale-105 relative"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={`${isSubmitting ? "animate-spin" : "hidden"} absolute left-10`}
          >
            <path
              fill="white"
              d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"
            />
          </svg>
          <p className="transition ease-in-out delay-200 group-hover:scale-125">Cadastrar</p>
        </button>
      </div>

      <div className="py-4 px-2 w-full">
        <Link
          href="/login"
          className="group flex items-center text-lightColor w-full text-left hover:text-primaryColor hover:underline"
        >
          <p>Já tem uma conta? Fazer Login</p>
          <BsArrowRightCircleFill className="ml-2 transition ease-in-out delay-150 group-hover:translate-x-2 group-hover:scale-150" />
        </Link>
      </div>
    </form>
  );
};

export default Form;
