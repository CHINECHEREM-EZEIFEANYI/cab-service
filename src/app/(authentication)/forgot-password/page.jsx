"use client";
import { useFormik } from "formik";
import { TextField } from "@/components/forms";
import { ForgottonPassword } from "@/components/forms/validattionRegex";
import { MdEmail } from "react-icons/md";
import { Button } from "@/components/ui";

export default function page() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgottonPassword,
    onSubmit: (values) => {
      // handle form submition when submit button is clicked
      console.log(values);
    },
  });
  return (
    <div className="w-[98%] md:w-[60%] lg:w-[40%] mx-auto forms-background py-8 px-4 text-white relative mt-[4rem] rounded-md">
      <h1 className="text-center text-2xl font-righteous ">Reset Password</h1>

      <form className="flex flex-col gap-4 mt-6" onSubmit={formik.handleSubmit}>
        <TextField
          type={"email"}
          placeholder={"Email"}
          id={"email"}
          name={"email"}
          startIcon={<MdEmail />}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email && formik.touched.email && formik.errors.email}
        />
        <div className="h-[2.5rem]">
          <Button bgWhite type={"submit"}>
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
