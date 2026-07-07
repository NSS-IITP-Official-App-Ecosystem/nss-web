import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import NextTopLoader from 'nextjs-toploader'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NSS IITP",
  description: "IIP NSS",
};

export default function RootLayout({ children }) {
  
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* The loading bar configuration */}
        <NextTopLoader 
          color="#2563eb" // Change this to your brand color
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false} // Hides the spinning circle icon
          easing="ease"
          speed={200}
          shadow="0 0 10px #2563eb,0 0 5px #2563eb"
        />
      <AuthProvider>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer/>
      </AuthProvider>
      </body>
    </html>
  );
}
