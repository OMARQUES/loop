"use client";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Form.module.css";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { useForm, SubmitHandler } from "react-hook-form";
import GoogleButton from "../GoogleButton";
import toast from "react-hot-toast";
import { useEffect } from "react";

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
    if (searchParams.get("error") === "OAuthAccountNotLinked") {
      toast.error("Email já está vinculado a outra conta");
      router.replace("/login");
    }
    if (searchParams.get("success") === "Account has been created") {
      toast.success("Usuario criado com sucesso");
    }
  }, [searchParams, router]);

  const formSubmit: SubmitHandler<Inputs> = async (form, e) => {
    e!.preventDefault();
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
    if (res?.error === "Error: Email em uso") {
      toast.error("Email já está vinculado a outra conta");
    }

    if (res?.ok) {
      router.replace("/home");
    }
    e!.target.reset();
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
          className=" w-full   border-solid border border-slate-200 focus:ring focus:ring-slate-300 rounded-full"
        />
        {errors.email?.message && <small className="block text-red-600 w-full">{errors.email.message}</small>}
      </fieldset>
      <fieldset className="w-full px-2 mt-5 flex justify-center items-center flex-col">
        <label className="w-full" htmlFor="password">
          Senha
        </label>
        <input
          type="password"
          placeholder="***********"
          {...register("password", {
            required: "Preecha a senha",
          })}
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
          <p className="transition ease-in-out delay-200 group-hover:scale-150">Entrar</p>
        </button>
        <p className={`py-6  text-slate-400 text-center ${styles.login_continue}`}>
          <span className="mr-1 ">Ou</span>
        </p>
      </div>
      <div className="flex w-full justify-center px-2 text-lg items-center transition ease-in-out delay-150 hover:scale-105">
        <GoogleButton />
      </div>

      <div className="py-4 px-2 w-full">
        <Link
          href="/register"
          className="group flex items-center text-lightColor hover:text-primaryColor hover:underline"
        >
          <p>Ainda não tem uma conta? Criar Conta</p>
          <BsArrowRightCircleFill className="ml-2 transition ease-in-out delay-150 group-hover:translate-x-2 group-hover:scale-150" />
        </Link>
      </div>
    </form>
  );
};

export default Form;
