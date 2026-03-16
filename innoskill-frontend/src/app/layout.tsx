import { Poppins } from 'next/font/google'
import "@/app/globals.css"
import { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import SiteNav from '@/components/site-nav';

const poppins = Poppins({ subsets: ['latin'], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: 'INNOSKILLS 2026',
  description: 'Register For INNOSKILLS 2026',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="bumblebee" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            @view-transition {
              navigation: auto;
            }
            ::view-transition-old(root),
            ::view-transition-new(root) {
              animation-duration: 0.25s;
              animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
          `
        }} />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            className: 'toast-enter',
            style: {
              background: '#fff',
              color: '#1e293b',
              padding: '16px',
              borderRadius: '12px',
              boxShadow: '0 10px 40px -10px rgba(0,0,0,0.15)',
              border: '1px solid rgba(0,0,0,0.05)',
            },
          }}
        />
        {/* SiteNav is rendered here, outside <main>, so its fixed mobile menu
            is never trapped inside a CSS-transform-animated ancestor element. */}
        <SiteNav />
        <main className="page-enter">
          {children}
        </main>
      </body>
    </html>
  )
}