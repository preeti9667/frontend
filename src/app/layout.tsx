import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Samanvay",
  description: "This is a meeting app",
  icons: {
    icon: "/favicon.png",
  }
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="body" 
       cz-shortcut-listen="true"
      > 
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
  
        {children}
  
      </body>
    </html>
  );
}
