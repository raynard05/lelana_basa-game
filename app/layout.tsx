import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import OrientationGuard from "@/components/OrientationGuard";
import GlobalSoundEffects from "@/components/GlobalSoundEffects";
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
      lang="id"
      translate="no"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased notranslate`}
    >
      <body className="min-h-full flex flex-col">
        <OrientationGuard />
        <GlobalSoundEffects />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function enableFullscreenAndLock() {
                  var path = window.location.pathname;
                  // Skip orientation locking and fullscreen on login and register pages
                  if (path === '/' || path === '/register') {
                    return;
                  }

                  if (!document.fullscreenElement) {
                    var docEl = document.documentElement;
                    var requestMethod = docEl.requestFullscreen || 
                                        docEl.webkitRequestFullscreen || 
                                        docEl.mozRequestFullScreen || 
                                        docEl.msRequestFullscreen;
                    if (requestMethod) {
                      requestMethod.call(docEl).then(function() {
                        if (screen.orientation && screen.orientation.lock) {
                          screen.orientation.lock('landscape').catch(function(err) {
                            console.log('Screen orientation lock failed:', err);
                          });
                        }
                      }).catch(function(err) {});
                    }
                  } else {
                    if (screen.orientation && screen.orientation.lock) {
                      screen.orientation.lock('landscape').catch(function(err) {});
                    }
                  }
                }
                document.addEventListener('click', enableFullscreenAndLock);
              })();
            `
          }}
        />
      </body>
    </html>
  );
}
