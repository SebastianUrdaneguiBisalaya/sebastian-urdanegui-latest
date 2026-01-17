'use client';

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="grow flex flex-col items-center justify-center gap-6">
            <h2 className="text-4xl md:text-6xl font-sora font-bold text-center">404</h2>
            <p className="font-reddit-sans text-white/75 text-center">Sorry, but I have not found the page you are looking for.</p>
            <Link
                className="font-reddit-sans hover:font-bold hover:underline transition-all duration-500 ease-out text-center"
                href='/'
            >
                Go to the home page
            </Link>
        </div>
    )
}