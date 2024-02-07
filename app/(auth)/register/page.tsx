import { Metadata } from "next";

import Form from "./Form";

export const metadata: Metadata = {
  title: "AuthDemo | Register",
};

const Register = () => {
  return (
    <main className="max-w-sm pb-12 mx-auto">
      <section>
        <Form />
      </section>
    </main>
  );
};

export default Register;
