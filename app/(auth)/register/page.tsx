import { Metadata } from "next";

import Form from "./Form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "AuthDemo | Register",
};

const Register = () => {
  return (
    <main className="max-w-sm pb-12 mx-auto">
      <section>
        <Suspense>
          <Form />
        </Suspense>
      </section>
    </main>
  );
};

export default Register;
