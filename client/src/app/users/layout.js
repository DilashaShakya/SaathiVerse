import { AppSidebar } from "@/components/ui/app-sidebar"

import { Poppins } from "next/font/google";


const defaultOpen = true;
// Define Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function Layout({ children }) {
  return (
    <div className={`flex min-h-screen bg-pink-50 ${poppins.variable}`}>
      <AppSidebar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
  
