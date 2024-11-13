'use client'

import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
})

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (values, { setSubmitting }) => {
    // Here you would typically send a request to your server
    console.log(values)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSubmitting(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="w-full max-w-[400px] space-y-8">
        <div className="space-y-6 text-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Az7G2PPipp6iHHkjAsWT9y47gSKtzy.png"
            alt="Buzzie Logo"
            width={120}
            height={120}
            className="mx-auto"
          />
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome to Buzzie!</h1>
            <p className="text-sm text-gray-500">Share the buzz around you in an exciting and fun manner</p>
          </div>
        </div>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <Field name="email">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="janedoe@gmail.com"
                      className={`h-12 px-4 rounded-full border-gray-200 ${errors.email && touched.email ? 'border-red-500' : ''}`}
                    />
                  )}
                </Field>
                <ErrorMessage name="email" component="div" className="text-xs text-red-500" />
              </div>
              <div className="relative space-y-2">
                <Field name="password">
                  {({ field }) => (
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className={`h-12 px-4 pr-12 rounded-full border-gray-200 ${errors.password && touched.password ? 'border-red-500' : ''}`}
                    />
                  )}
                </Field>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-0 h-12 w-12 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
                <ErrorMessage name="password" component="div" className="text-xs text-red-500" />
              </div>
              <Button 
                type="submit" 
                className="h-12 w-full bg-[#FFD700] font-medium text-black hover:bg-[#FFD700]/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'LOGIN'}
              </Button>
              <Link 
                href="/forgot-password"
                className="block text-center text-sm text-[#FFD700] hover:underline"
              >
                Forgot password?
              </Link>
            </Form>
          )}
        </Formik>
        <div className="text-center text-sm">
          {"Don't have an account? "}
          <Link href="/register" className="text-[#FFD700] hover:underline">
            Register!
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
