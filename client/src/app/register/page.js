"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-3xl space-y-8">
        <div className="space-y-2 text-center">
          <div className="flex justify-center">
            <div className="relative w-20 h-20">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-black rounded-full absolute top-2 right-4" />
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Welcome to Buzzie!</h1>
          <p className="text-gray-500 text-lg">Share the buzz around you in an exciting and fun manner</p>
        </div>
        <div className="space-y-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className="w-full h-12 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="janedoe@gmail.com"
                className="w-full h-12 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full h-12 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-12 w-12 flex items-center justify-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full h-12 text-base bg-yellow-400 hover:bg-yellow-500 text-black rounded-md transition-colors duration-200"
          >
            Sign Up
          </button>
          <div className="text-center space-y-4">
            <Link 
              href="/forgot-password" 
              className="block text-sm text-yellow-600 hover:text-yellow-700"
            >
              Forgot password?
            </Link>
            <div className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link 
                href="/login" 
                className="text-yellow-600 hover:text-yellow-700 font-medium"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}