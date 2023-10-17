import * as yup from "yup"

export const loginValdationSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(5,"Too short").required("Password is required")
})