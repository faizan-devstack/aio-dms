import type { Metadata, Viewport } from "next";
import "./globals.css"
import { Poppins } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google'

const APP_NAME = "App";
const APP_DEFAULT_TITLE = "Next App";
const APP_TITLE_TEMPLATE = "";
const APP_DESCRIPTION = "";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#c6e9d5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-XYZ" />
      <body
        className={`${poppins.className} bg-[#e2f0e7] text-[#2f2f2f]`}
      >
        {children}
      </body>
    </html>
  );
}