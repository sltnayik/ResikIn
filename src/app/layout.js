import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "ResikIn",
  description: "Platform pelaporan sampah berbasis digital",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gray-50 text-gray-900">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}