import { Toaster } from "sonner";
import "./globals.css";
import { Poppins, Montserrat } from "next/font/google";


const defaultOpen = true;
// Define Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

// Define Montserrat (Replacing Fredoka)
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${montserrat.variable}`}>
      
      <body className="font-sans">
      
        {children}
       <Toaster/></body>
    </html>
  );
}






