"use client"

import * as Yup from "yup";
import { Card } from "./ui/card";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Eye, EyeOff, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { addUserDetails } from "@/lib/redux/slice/userSlice";
import { useDispatch } from "react-redux";
const { default: Image } = require("next/image");
const { useState } = require("react")

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(4, 'Password must be at least 4 characters').required('Required'),
})

const LoginModal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 px-4 relative">
      <div className="absolute top-8 left-8">
        <h2 className="font-bold text-2xl">
          <span className="text-pink-400">Saathi</span>
          <span className="text-amber-400">Verse</span>.
        </h2>
      </div>
      <Card className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between overflow-hidden rounded-3xl shadow-xl bg-white relative">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center h-full p-6 relative">
          <Image src='/saathi.png' alt="image-homescreen" width={500} height={250} className="max-w-full h-auto" />
        </div>
        <div className="w-full md:w-1/2 bg-white p-6 md:p-10 relative font-[montserrat]">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left"> Login </h1>
          <Formik 
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const { data } = await axios.post("http://localhost:8000/login", values, {
                  headers: { "Content-Type": "application/json" },
                });
                toast.success(data?.msg || "Login successful!");
                
                router.push("/users/dashboard");
                dispatch(addUserDetails(data?.user))
                
                localStorage.setItem("token", data.token);
              } catch (error) {
                toast.error(error.response?.data?.msg || "Something went wrong. Try again.");
              }
              setSubmitting(false);
            }}
          >
            {({ values, handleChange, handleSubmit, isSubmitting }) => (
              <Form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-gray-700">Email</label>
                  <div className="flex items-center border-2 border-orange-300 focus-within:border-orange-500 rounded-lg w-full px-4 py-2 gap-2 transition-all">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <Field type="email" name="email" className="w-full outline-none bg-transparent" placeholder="Enter your email" />
                  </div>
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-gray-700">Password</label>
                  <div className="flex items-center border-2 border-pink-300 gap-2 focus-within:border-pink-500 rounded-lg w-full px-4 py-2 transition-all">
                    {showPassword ? <Eye className="h-5 w-5 text-gray-400" /> : <EyeOff className="h-5 w-5 text-gray-400" />}
                    <Field type={showPassword ? "text" : "password"} name="password" value={values.password} onChange={handleChange} className="w-full outline-none bg-transparent" placeholder="Enter your password" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-auto">
                      {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1 min-h-[20px]" />
                  <div className="flex justify-between items-center text-sm">
                    <Link href="#" className="text-amber-500 hover:text-amber-600">Forgot Password?</Link>
                    <Link href="/register" className="text-pink-400 hover:text-amber-600">Register</Link>
                  </div>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full bg-pink-400 hover:bg-yellow-500 text-white text-lg py-4 rounded-lg">
                  {isSubmitting ? "Logging in..." : "Log In"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Card>
    </div>
  )
}

export default LoginModal;
