import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner'; // ✅ Import the Toaster

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ComplaintCare - Efficient Complaint Management System',
  description: 'A modern complaint management system for efficient resolution of issues',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster richColors position="top-right" duration={1000}  /> {/* ✅ Add the Toaster globally */}
        {children}
      </body>
    </html>
  );
}
