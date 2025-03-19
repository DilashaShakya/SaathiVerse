"use client"
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast"; // Make sure this is imported
import { Poppins } from 'next/font/google';

// Import Poppins font
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const Home = () => {

  const triggerToast = () => {
    toast.success("This is a success toast!"); // Triggering a success toast
  };

  return (
    <div className={`font-${poppins.className}`}>
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Button to trigger toast */}
      <button
        onClick={triggerToast}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Trigger Toast
      </button>
      
    </div>
  );
};

export default Home;
