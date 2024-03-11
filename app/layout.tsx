import React, { useState } from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sicu-aura-Portfolio - Admin',
  description: 'Sicu-aura : Your one stop safety solutions from India',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // return (
  //   <html lang="en">
  //     <body suppressHydrationWarning={true} className={inter.className}>
  //       <div className="flex">
  //         <Sidebar />
  //         <div className="w-screen h-screen">
  //           <Navbar />
  //           {children}
  //         </div>
  //       </div>
  //     </body>
  //   </html>
  // );
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
      
            {children}
        
      </body>
    </html>
  );
}

