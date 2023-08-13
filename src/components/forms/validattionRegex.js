import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "invalid email address")
    .required("no email provided"),
  password: Yup.string()
    .required("No password provided")
    .min(4, "Password is too short - should be 4 chars minimum.")
    .matches(/[a-zA-Z\d]/, "Password can only contain Latin letters."),
});

export const SignUpSchema = Yup.object({
  email: Yup.string()
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "invalid email address")
    .required("no email provided"),
  password: Yup.string()
    .required("No password provided")
    .min(4, "Password is too short - should be 4 chars minimum.")
    .matches(/[a-zA-Z\d]/, "Password can only contain Latin letters."),
  firstName: Yup.string()
    .required("No name provided")
    .min(2, "Name is too short - should be 2 chars minimum."),

  lastName: Yup.string()
    .required("No name provided")
    .min(2, "Name is too short - should be 2 chars minimum."),
  license: Yup.string()
    .required("No license provided")
    .min(8, "license is too short - should be 8 chars minimum."),
});

export const ForgottonPassword = Yup.object({
  email: Yup.string()
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "invalid email address")
    .required("no email provided"),
});
