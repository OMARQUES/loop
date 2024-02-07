import { Toaster } from "react-hot-toast";
import { NextAuthProvider } from "../Provider";
import Header from "../components/Header";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <Toaster position="bottom-right" />
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
