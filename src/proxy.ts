import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LEGACY_URLS: Record<string, string> = {
	'/es': '/',
};

export default function proxy(request: NextRequest) {
	const url = request.nextUrl.clone();
    
    const pathname = decodeURIComponent(url.pathname);

    if (pathname !== pathname.toLowerCase()) {
        const lowerUrl = new URL(request.url);
        lowerUrl.pathname = pathname.toLowerCase();
        return NextResponse.redirect(lowerUrl, 301);
    }
    
    if (LEGACY_URLS[pathname]) {
        const redirectTo = LEGACY_URLS[pathname];
        return NextResponse.redirect(new URL(redirectTo, request.url), 301);
    }

	return NextResponse.next();
}

export const config = {
	matcher: '/((?!api|_next/static|_next/image|.*\\.webp$).*)',
};
