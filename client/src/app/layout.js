import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

import { Poppins } from "next/font/google";

// Initialize the Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${poppins.variable} font-sans`}>{children} <Toaster/></body>
    </html>
  );
}


