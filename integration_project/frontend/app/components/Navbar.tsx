// components/Navbar.tsx
'use client'
import Link from 'next/link';
import {getSession, signIn, signOut, useSession} from "next-auth/react";
import SearchUserBar from "@/app/components/SearchUserBar";


export default function Navbar() {
    const {data: session} = useSession();


    return (
        <div className="sticky top-0 z-50 bg-violet-500 pb-2.5 pr-2.5 pl-2.5 h-[50px]">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/">
                        <button
                            className="bg-violet-700 text-white px-3 h-8 mt-2 rounded-md text-sm font-medium mr-3 hover:bg-violet-900 focus:outline-none focus:ring-2 focus:bg-violet-900 focus:ring-offset-2">
                            Home
                        </button>
                    </Link>
                    <Link href={"/se/workspace"}>
                        <button
                            className="bg-violet-700 text-white px-3 h-8 mt-2 rounded-md text-sm font-medium mr-3 hover:bg-violet-900 focus:outline-none focus:ring-2 focus:bg-violet-900 focus:ring-offset-2">
                            Workspace
                        </button>
                    </Link>
                    <Link href={"/se/compiler"}>
                        <button
                            className="bg-violet-700 text-white px-3 h-8 mt-2 rounded-md text-sm font-medium mr-3 hover:bg-violet-900 focus:outline-none focus:ring-2 focus:bg-violet-900 focus:ring-offset-2">
                            Compiler
                        </button>
                    </Link>

                    {session?.user?.type === "admin" && (
                        <Link href={'/admin'}>
                            <button
                                className="bg-violet-700 text-white px-3 h-8 mt-2 rounded-md text-sm font-medium mr-3 hover:bg-violet-900 focus:outline-none focus:ring-2 focus:bg-violet-900 focus:ring-offset-2">
                                Admin Panel
                            </button>
                        </Link>
                    )}
                </div>

                <div className={`mt-2 w-[25%] ${session?.user ? 'ml-[1%]' : 'ml-[-7%]'}`}>
                    <SearchUserBar/>
                </div>

                <div className="flex items-center">
                    {session ? (
                        <div className="flex items-center">
                        <div className="flex items-center">
                                <p className="text-white text-sm font-bold mt-3 mr-6">Welcome, {session.user?.username}!</p>
                                <Link href={`/profile/${session.user?.id}`}>
                                    <button
                                        className="bg-violet-700 text-white px-3 h-8 mt-2 rounded-md text-sm font-medium mr-3 hover:bg-violet-900 focus:outline-none focus:ring-2 focus:bg-violet-900 focus:ring-offset-2">
                                        Profile
                                    </button>
                                </Link>
                            </div>
                            <button
                                className="bg-violet-700 text-white px-3 h-8 mt-2 rounded-md text-sm font-medium mr-3 hover:bg-violet-900 focus:outline-none focus:ring-2 focus:bg-violet-900 focus:ring-offset-2"
                                onClick={() => signOut()}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            className="bg-violet-700 text-white px-3 h-8 mt-2 rounded-md text-sm font-medium hover:bg-violet-900 focus:outline-none focus:ring-2 focus:bg-violet-900 focus:ring-offset-2"
                            onClick={() => signIn()}>
                            Login
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

