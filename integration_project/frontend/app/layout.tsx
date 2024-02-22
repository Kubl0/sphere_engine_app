import './globals.css'
import React, {ReactNode} from "react";
import Navbar from "@/app/components/Navbar";
import {getServerSession} from "next-auth";
import {Metadata} from "next";
import SessionProvider from "@/app/components/SessionProvider";
import Script from "next/script";


declare global{
    interface Window {
        SE: any;
    }

}
export const metadata: Metadata = {
    title: 'SocialHub',
    description: '',
}


export default async function RootLayout({children}: Readonly<{ children: ReactNode }>) {
    const session = await getServerSession();

    return (
        <html lang="en">
        <body className="h-[100vh] flex flex-col">
        <SessionProvider session={session}>
            <Navbar />
            {children}
        </SessionProvider>
        </body>
        </html>
    );
}
