import type { MetadataRoute } from 'next';

import { blogList } from '@/constants/constants';
import { SITE_URL } from '@/libs/site';

export default function sitemap(): MetadataRoute.Sitemap {
	const pages: MetadataRoute.Sitemap = [
		{ changeFrequency: 'monthly', priority: 1, url: SITE_URL },
		{ changeFrequency: 'monthly', priority: 0.8, url: `${SITE_URL}/projects` },
		{ changeFrequency: 'weekly', priority: 0.8, url: `${SITE_URL}/blog` },
		{ changeFrequency: 'weekly', priority: 0.5, url: `${SITE_URL}/activity` },
	];

	const posts: MetadataRoute.Sitemap = blogList
		.filter(post => post.link)
		.map(post => ({ changeFrequency: 'yearly', priority: 0.7, url: `${SITE_URL}${post.link}` }));

	return [...pages, ...posts];
}
