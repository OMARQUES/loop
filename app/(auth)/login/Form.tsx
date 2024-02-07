"use client";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Form.module.css";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { useForm, SubmitHandler } from "react-hook-form";
import GoogleButton from "../GoogleButton";
import Loader from "../loading";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { error } from "console";
import { ok } from "assert";

type Inputs = {
  email: string;
  password: string;
};

const Form = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    console.log(searchParams.get("success"));

    if (searchParams.get("error") === "OAuthAccountNotLinked") {
      toast.error("Email já está vinculado a outra conta");
      router.replace("/login");
    }
    if (searchParams.get("success") === "Account has been created") {
      toast.success("Usuario criado com sucesso");
    }
  }, []);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { email, password } = form;
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log(res?.error);
    if (res?.error === "Error: Email ou senha incorretos") {
      toast.error("Email ou senha incorretos");
    }
    if (res?.ok) {
      router.replace("/home");
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className={`${styles.form_container} flex justify-center items-center flex-col`}
    >
      <h2 className={`leading-[1.15] mt-12 mx-auto w-full  px-2 text-xl my-6 sm:text-2xl font-semibold  font-Poppins`}>
        Log In
      </h2>

      <fieldset className="w-full px-2 flex justify-center items-center flex-col">
        <label className="w-full " htmlFor="email">
          Email
        </label>
        <input
          type="email"
          placeholder="email@exemplo.com"
          {...register("email", {
            required: "Preecnha o email",
            pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
          })}
          className=" w-full   border-solid border-[1px] border-[#EAECEF]"
        />
        {errors.email?.message && <small className="block text-red-600 w-full">{errors.email.message}</small>}
      </fieldset>
      <fieldset className="w-full px-2 mt-12 flex justify-center items-center flex-col">
        <label className="w-full" htmlFor="password">
          Senha
        </label>
        <input
          type="password"
          placeholder="***********"
          {...register("password", {
            required: "Preecha a senha",
          })}
          className=" w-full   border-solid border-[1px] border-[#EAECEF]"
        />
        {errors.password?.message && <small className="block text-red-600 w-full">{errors.password.message}</small>}
      </fieldset>
      <div className={`flex flex-col justify-center w-full items-center px-2`}>
        <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center">
          <span
            className="text-center flex-1   mt-6 bg-green-700 text-white cursor-pointer rounded-md p-[1rem] px-4  
                       transition ease-in-out delay-150 hover:scale-105"
          >
            Entrar
          </span>
        </button>
        <p className={`py-6  text-slate-400 text-center ${styles.login_continue}`}>
          <span className="mr-1 ">Ou</span>
        </p>
      </div>
      <div className="flex w-full justify-center px-2 text-lg items-center">
        <GoogleButton />
      </div>

      <div className="py-4 px-2 w-full">
        <p>
          <Link href="/register" className="text-lightColor hover:text-primaryColor hover:underline">
            {" "}
            Ainda não tem uma conta? Criar Conta
            <BsArrowRightCircleFill className="ml-2" />
          </Link>
        </p>
      </div>
      {isSubmitting && <Loader />}
    </form>
  );
};

export default Form;
