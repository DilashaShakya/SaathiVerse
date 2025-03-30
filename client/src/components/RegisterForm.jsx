"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import axios from "axios";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Define the spinner icon component
const SpinnerIcon = () => (
  <svg
    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

// Define the Google icon component
const GoogleIcon = () => (
  <svg
    className="mr-2 h-4 w-4"
    aria-hidden="true"
    focusable="false"
    data-prefix="fab"
    data-icon="google"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 488 512"
  >
    <path
      fill="currentColor"
      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
    ></path>
  </svg>
);

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  userName: Yup.string().min(4, "Username must be at least 4 characters").required("Username is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits")
    .required("Phone number is required"),
    
});

export default function RegisterForm() {
  const router = useRouter();
  

  const handleRegister = async (values) => {
    if (!values.userName) {
      toast.error("Username cannot be empty");
      return;
    }
  
    try {
      const res = await axios.post("http://localhost:3000/register", values);
      
      console.log("✅ Register Response:", res.data);
  
      if (res.status === 200 || res.status === 201) {
        toast.success(res.data?.msg || "Registration successful!");
        
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
    } catch (error) {
      console.error("❌ Registration Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.msg || "Registration failed");
    }
  };
  
  
  

  const formik = useFormik({
    initialValues: {
      fullName: "",
      userName:"",
      email: "",
      password: "",
      phoneNumber: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      handleRegister(values); // Call the registration handler
      
    },
  });

  return (
    <>
      {/* Add Poppins font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
      `}</style>

      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden font-[Poppins]">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 font-[Poppins]">Create an account</h2>
          <p className="text-sm text-gray-500 mt-1 font-[Poppins]">Enter your details to register</p>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-700 font-[Poppins]">
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                className="border-gray-300 focus:border-amber-500 focus:ring-amber-500 font-[Poppins]"
                {...formik.getFieldProps("fullName")}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-sm text-red-500 font-[Poppins]">{formik.errors.fullName}</p>
              )}
            </div>
            

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-[Poppins]">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                className="border-gray-300 focus:border-amber-500 focus:ring-amber-500 font-[Poppins]"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500 font-[Poppins]">{formik.errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="userName" className="text-gray-700 font-[Poppins]">
                UserName
              </Label>
              <Input
                id="userName"
                name="userName"
                type="text"
                className="border-gray-300 focus:border-amber-500 focus:ring-amber-500 font-[Poppins]"
                {...formik.getFieldProps("userName")}
              />
              {formik.touched.userName && formik.errors.userName && (
                <p className="text-sm text-red-500 font-[Poppins]">{formik.errors.userName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-[Poppins]">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                className="border-gray-300 focus:border-amber-500 focus:ring-amber-500 font-[Poppins]"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500 font-[Poppins]">{formik.errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-gray-700 font-[Poppins]">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="1234567890"
                className="border-gray-300 focus:border-amber-500 focus:ring-amber-500 font-[Poppins]"
                {...formik.getFieldProps("phoneNumber")}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="text-sm text-red-500 font-[Poppins]">{formik.errors.phoneNumber}</p>
              )}
            </div>

            
            <Button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-[Poppins] font-medium"
                disabled={formik.isSubmitting}
                >
                {formik.isSubmitting ? (
                    <>
                    <SpinnerIcon />
                    Creating account...
                    </>
                ) : (
                    "Register"
                )}
                </Button>

            
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase font-[Poppins]">
              <span className="bg-gray-50 px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-[Poppins]"
            type="button"
          >
            <GoogleIcon />
            Google
          </Button>

          <div className="mt-4 text-center text-sm text-gray-600 font-[Poppins]">
            Already have an account?{" "}
            <a href="/login" className="text-amber-600 hover:text-amber-700 font-medium">
              Log in
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
