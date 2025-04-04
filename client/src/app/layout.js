import { Toaster } from "sonner";
import "./globals.css";
import { Poppins, Montserrat } from "next/font/google";
import ReduxProvider from "@/lib/redux/reduxProvider";


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
        <ReduxProvider>
        {children}
        </ReduxProvider>
        
       <Toaster/></body>
    </html>
  );
}






