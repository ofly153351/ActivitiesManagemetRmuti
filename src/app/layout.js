// import { Inter } from "next/font/google";
import "./globals.css";
// import { kanit } from ""
// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ระบบจักการกิจกรรม",
  description: "ระบบจักการกิจกรรม",
  icons: {
    icon: "/runner.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
