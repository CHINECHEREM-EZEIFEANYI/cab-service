"use client";
import { useFormik } from "formik";
import Link from "next/link";

import { useState } from "react";
import { MdEmail, MdOutlineKey } from "react-icons/md";
import { BsFillCarFrontFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import TextField from "@/components/forms/TextField";
import { SignUpSchema, loginSchema } from "@/components/forms/validattionRegex";
import { Button, CheckButton } from "@/components/ui";
import { ListBox } from "@/components/forms";

const people = [{ name: "Driver" }, { name: "Passenger" }];
export default function page() {
  const [selected, setSelected] = useState(people[0]);
  console.log(selected);
  const formik = useFormik({
    initialValues: {
      lastName: "",
      firstName: "",
      license: "",
      email: "",
      password: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      // handle form submition when submit button is clicked
      console.log(values);
    },
  });
  return (
    <div className="w-[98%] md:w-[60%] lg:w-[40%] mx-auto forms-background py-4 px-4 text-white relative mt-[2rem] rounded-md">
      <h1 className="text-center text-2xl font-righteous">Register</h1>
      <p className="text-sm font-inter">Choose Account Type</p>
      <div className="">
        <ListBox people={people} selected={selected} setSelected={setSelected} />
      </div>

      <form className="flex flex-col gap-6 font-inter mt-4" onSubmit={formik.handleSubmit}>
        <TextField
          type={"text"}
          placeholder={"Last Name"}
          startIcon={<FaUser />}
          name={"lastName"}
          id={"lastName"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.lastName && formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          type={"text"}
          placeholder={"First Name"}
          startIcon={<FaUser />}
          name={"firstName"}
          id={"firstName"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.firstName && formik.touched.firstName && formik.errors.firstName}
        />
        {selected.name == "Driver" && (
          <TextField
            type={"text"}
            placeholder={"License Number"}
            startIcon={<BsFillCarFrontFill />}
            name={"license"}
            id={"license"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.license && formik.touched.license && formik.errors.license}
          />
        )}

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

        <div className="h-[2.5rem]">
          <Button bgWhite type={"submit"}>
            Register
          </Button>
        </div>
      </form>
      <p className="mt-4 text-center">
        Already have an Account?{" "}
        <Link href={"/login"} className="hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
