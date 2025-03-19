"use client";

import RegisterForm from "@/components/RegisterForm";


const RegisterPage = () => {
  return (
      <div className="min-h-screen flex flex-col items-center justify-center font-[Poppins]">
           <h1 className="text-4xl font-semi-bold mb-6">Welcome to SaathiVerse </h1>
          <div className="w-full max-w-md">
          <RegisterForm />
        </div>
        </div>

  );
};

export default RegisterPage;