"use client"

import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import Image from "next/image"
import { Eye, EyeOff, Mail, User, Lock, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import axios from "axios"
import { cn } from "@/lib/utils"

// Validation schema using Yup
const SignUpSchema = Yup.object().shape({
  fullName: Yup.string().min(2, "Name is too short").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  userName: Yup.string().min(3, "Username is too short").required("Username is required"),
  password: Yup.string().min(4, "Password must be at least 4 characters").required("Password is required"),
})

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleRegister = async (values, setSubmitting) => {
    if (!values.userName) {
      toast.error("UserName cannot be empty")
      return
    }

    try {
      const res = await axios.post("http://localhost:8000/register", values)

      console.log("✅ Register Response:", res.data)

      if (res.status === 200 || res.status === 201) {
        toast.success(res.data?.msg || "Registration successful!")

        setTimeout(() => {
          router.push("/login")
        }, 1000)
      }
    } catch (error) {
      console.error("❌ Registration Error:", error.response?.data || error.message)
      toast.error(error.response?.data?.msg || "Registration failed")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8">
          <div className="mb-4 md:mb-0 md:max-w-[50%]">
            <h1 className="text-3xl font-semibold text-gray-900 mt-4">
              Welcome to <span className="text-[#FF6B6B]">Saathi</span>
              <span className="text-[#FFB347]">Verse</span>!
            </h1>
            <p className="text-gray-700 mt-2">Create an account and join the fun!</p>
          </div>
          <div className="relative w-400 h-40 ">
            <Image
              src="/nepalipenguin.png"
              alt="Welcome Penguin"
              width={600}
              height={600}
              className="object-contain z-10"
              priority
            />
          </div>
        </div>

        <Formik
          initialValues={{
            fullName: "",
            email: "",
            userName: "",
            password: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleRegister(values, setSubmitting)
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                {/* Name field */}
                <div
                  className={cn(
                    "flex items-center border-2 rounded-lg px-3 py-3 mb-4 ",
                    errors.fullName && touched.fullName ? "border-red-500" : "border-[#FFB347]",
                  )}
                >
                  <User className="h-5 w-5 text-gray-400 mr-2" />
                  <Field type="text" name="fullName" placeholder="Name" className="flex-1 outline-none text-gray-700" />
                </div>
                <ErrorMessage name="fullName" component="p" className="text-red-500 text-sm mt-1 mb-2" />
              </div>

              <div>
                {/* Email field */}
                <div
                  className={cn(
                    "flex items-center border-2 rounded-lg px-3 py-3 mb-4",
                    errors.email && touched.email ? "border-red-500" : "border-pink-300",
                  )}
                >
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  <Field type="email" name="email" placeholder="Email" className="flex-1 outline-none text-gray-700" />
                </div>
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1 mb-2" />
              </div>

              <div>
                {/* Username field */}
                <div
                  className={cn(
                    "flex items-center border-2 rounded-lg px-3 py-3 mb-4",
                    errors.userName && touched.userName ? "border-red-500" : "border-[#FFB347]",
                  )}
                >
                  <UserCircle className="h-5 w-5 text-gray-400 mr-2" />
                  <Field
                    type="text"
                    name="userName"
                    placeholder="Username"
                    className="flex-1 outline-none text-gray-700"
                  />
                </div>
                <ErrorMessage name="username" component="p" className="text-red-500 text-sm mt-1 mb-2" />
              </div>

              <div>
                {/* Password Field */}
                <div
                  className={cn(
                    "flex items-center border-2 rounded-lg px-3 py-3 mb-4",
                    errors.password && touched.password ? "border-red-500" : "border-pink-300",
                  )}
                >
                  <Lock className="h-5 w-5 text-gray-400 mr-2" />
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="flex-1 outline-none text-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1 mb-2" />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF6B6B] text-white rounded-lg py-3 mt-6 hover:bg-[#ff5252] transition-colors disabled:opacity-70"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
            </Form>
          )}
        </Formik>

        <p className="text-center mt-6 text-gray-700">
          Already have an account?{" "}
          <a href="/login" className="text-[#FF6B6B] hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  )
}

export default Register

