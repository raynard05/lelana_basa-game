import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lelana Basa - Login",
  description: "Sugeng Rawuh - Selamat Datang di Lelana Basa",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function enableFullscreen() {
                  if (!document.fullscreenElement) {
                    var docEl = document.documentElement;
                    var requestMethod = docEl.requestFullscreen || 
                                        docEl.webkitRequestFullscreen || 
                                        docEl.mozRequestFullScreen || 
                                        docEl.msRequestFullscreen;
                    if (requestMethod) {
                      requestMethod.call(docEl).catch(function(err) {});
                    }
                  }
                }
                document.addEventListener('click', enableFullscreen);
              })();
            `
          }}
        />
      </body>
    </html>
  );
}
