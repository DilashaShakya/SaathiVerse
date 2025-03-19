'use client'

import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
})

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post('http://localhost:8000/login', values);
  
        console.log('Backend Response:', data); // Debugging response
  
        const { isLoggedIn, token } = data;
  
        if (isLoggedIn) {
          router.push('/dashboard');
        } else {
          console.error('Login failed: Invalid login status.');
        }
      } catch (error) {
        console.error('Error during login:', error?.response?.data?.msg || error.message);
      }
    },
  });
  

    
  
  
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
            <h1 className="text-2xl font-semibold tracking-tight font-[Poppins]">Welcome to SaathiVerse!</h1>
            <p className="text-sm text-gray-500 font-[Poppins]">Share the connection and fun around you together.</p>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
  
  id="email"
              name="email"
              type="email"
              placeholder="janedoe@gmail.com"
              className={`h-12 px-4 rounded-full border-gray-200 ${
                formik.errors.email && formik.touched.email ? 'border-red-500' : ''
              }`}
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-xs text-red-500">{formik.errors.email}</div>
            )}
          </div>
          <div className="relative space-y-2">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`h-12 px-4 pr-12 rounded-full border-gray-200 ${
                formik.errors.password && formik.touched.password ? 'border-red-500' : ''
              }`}
              {...formik.getFieldProps('password')}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-transparent focus:bg-transparent active:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Button>

            {formik.touched.password && formik.errors.password && (
              <div className="text-xs text-red-500">{formik.errors.password}</div>
            )}
          </div>
          <Button 
            type="submit" 
            className="h-12 w-full bg-[#FFD700] font-medium text-black hover:bg-[#FFD700]/90 font-[Poppins]"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Logging in...' : 'LOGIN'}
          </Button>
          <Link 
            href="/forgot-password"
            className="block text-center text-sm text-[#FFD700] hover:underline"
          >
            Forgot password?
          </Link>
        </form>
        <div className="text-center text-sm font-[Poppins]">
          {"Don't have an account? "}
          <Link href="/register" className="text-[#FFD700] hover:underline">
            Register!
          </Link>
        </div>
      </div>
    </div>
  )
}