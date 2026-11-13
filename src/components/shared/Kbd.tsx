import * as React from 'react';

import { cn } from '@/libs/cn';

/** A keyboard key, styled with the site's tokens. Radix has no Kbd primitive, so it lives here. */
export default function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
	return <kbd className={cn('inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1 font-mono text-[11px] text-tertiary', className)} {...props} />;
}
