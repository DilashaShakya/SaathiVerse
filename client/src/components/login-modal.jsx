"use client"

import * as Yup from "yup";
import { Card } from "./ui/card";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import { Eye, EyeOff, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
const { default: Image } = require("next/image");
const { useState } = require("react")

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
  })

const LoginModal =()=>{
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()

  return(
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <Card className= "w-full max-w-5xl flex flex-row items-center justify-between overflow-hidden rounded-3xl shadow-lg bg-white">
        <div className="w-1/2 flex items-center justify-center h-full"> 
          <div className="absolute top-8 left-8">
          <h2 className="font-bold text-2xl">
            <span className="text-pink-400">Saathi</span>
            <span className="text-amber-400">Verse</span>.
          </h2>

            </div>
            <Image src = '/saathi.png'alt="image-homescreen" 
            width={700} 
            height={300}/>
        </div>
        <div className="w-1/2 bg-white p-10 relative font-[montserrat]">
          {/* <div className="mt-12 space-y-8"> */}
            <h1 className="text-3xl fount-bold text-gray-900 mb-8 "> Login </h1>
            <Formik 
            initialValues={{email: "", password:""}}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const { data } = await axios.post("http://localhost:3000/login", values, {
                  headers: { "Content-Type": "application/json" },
                });
                console.log("✅ Backend Response:", data);
                toast.success(data?.msg || "Login successful!");
                setTimeout(() => {
                  router.push("/dashboard");
                }, 1000);
                localStorage.setItem("token", data.token);
              } catch (error) {
                console.error("❌ Login Error:", error.response?.data || error.message);
                toast.error(error.response?.data?.msg || "Something went wrong. Try again.");
              }
              setSubmitting(false);
            }}
          >
              {({ values, handleChange, handleSubmit, isSubmitting }) => (
              <Form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-gray-700">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        type="email"
                        name="email"
                        className="pl-10 border-2 border-orange-300 rounded-lg py-2 w-full"
                        placeholder="Enter your email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        {showPassword ? (
                          <Eye className="h-5 w-5 text-gray-400" />
                        ) : (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        className="pl-10 border-2 border-pink-300 rounded-lg py-2 w-full"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Link href="#" className="text-amber-500 hover:text-amber-600 text-sm">
                        Forgot Password?
                      </Link>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-pink-400 hover:bg-pink-500 text-white text-lg py-6 rounded-lg"
                  >
                    {isSubmitting ? "Logging in..." : "Log In"}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
          
        {/* </div> */}
      </Card>
    </div>
  )
}

export default LoginModal;