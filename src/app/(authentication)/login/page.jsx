"use client";
import { useState } from "react";
import { useFormik } from "formik";
import Link from "next/link";

import { MdEmail, MdOutlineKey } from "react-icons/md";
import TextField from "@/components/forms/TextField";
import { loginSchema } from "@/components/forms/validattionRegex";
import { Button, CheckButton } from "@/components/ui";
import { ListBox } from "@/components/forms";

const people = [{ name: "Driver" }, { name: "Passenger" }];

export default function page() {
  const [selected, setSelected] = useState(people[0]);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      // handle form submition when submit button is clicked
      console.log(values);
    },
  });

  return (
    <div className="w-[98%] md:w-[60%] lg:w-[40%] mx-auto forms-background py-8 px-4 text-white relative mt-[4rem] rounded-md">
      <h1 className="text-center text-2xl font-righteous">Login Page</h1>
      <p className="text-sm font-inter">Choose Account Type</p>
      <div className="">
        <ListBox people={people} selected={selected} setSelected={setSelected} />
      </div>

      <form className="flex flex-col gap-6 font-inter mt-4" onSubmit={formik.handleSubmit}>
        <TextField
          type={"email"}
          placeholder={"Enter Email"}
          startIcon={<MdEmail />}
          name={"email"}
          id={"email"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email && formik.touched.email && formik.errors.email}
        />
        <TextField
          type={"password"}
          placeholder={"Enter Password"}
          startIcon={<MdOutlineKey />}
          name={"password"}
          id={"password"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password && formik.touched.password && formik.errors.password}
        />
        <div className="flex items-center gap-1 text-sm">
          <CheckButton />
          <p>Remember Me</p>
          <Link href={"/forgot-password"} className="ml-auto hover:underline">
            Forgot Password?
          </Link>
        </div>
        <div className="h-[2.5rem]">
          <Button bgWhite type={"submit"}>
            Login
          </Button>
        </div>
      </form>
      <p className="mt-4 text-center">
        Don't have an Account?{" "}
        <Link href={"/sign-up"} className="hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
