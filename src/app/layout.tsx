import { Geist, Geist_Mono } from "next/font/google";
import { ConferenceProvider } from '../context/Conference';
import { NavHeaderProvider } from "./04_components/NavBarProvider";
import "./globals.css";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ConferenceProvider>
          <NavHeaderProvider>
            
            {children}
            
          </NavHeaderProvider>
        </ConferenceProvider>
      </body>
    </html>
  );
}
