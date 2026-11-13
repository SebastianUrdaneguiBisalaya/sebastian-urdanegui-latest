import type { Metadata } from 'next';

interface PageMetadataOptions {
	description: string;
	/** Route path, resolved against the root layout's `metadataBase`. */
	path: string;
	title: string;
	type?: 'article' | 'website';
}

/**
 * Page metadata with matching Open Graph and Twitter tags. Next merges
 * `openGraph`/`twitter` shallowly and never derives them from `title`, so a
 * page that only set `title` would still share the home page's card.
 */
export function pageMetadata({ description, path, title, type = 'website' }: PageMetadataOptions): Metadata {
	return {
		description,
		openGraph: { description, title, type, url: path },
		title,
		twitter: { card: 'summary_large_image', description, title },
	};
}
