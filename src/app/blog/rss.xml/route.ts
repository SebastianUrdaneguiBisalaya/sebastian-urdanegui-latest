import { blogList } from '@/constants/constants';
import { SITE_URL } from '@/libs/site';

export const dynamic = 'force-static';

const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export function GET() {
	const items = blogList
		.map(post => {
			const url = `${SITE_URL}${post.link ?? '/blog'}`;
			return [
				'    <item>',
				`      <title>${escapeXml(post.name)}</title>`,
				`      <link>${escapeXml(url)}</link>`,
				`      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
				`      <description>${escapeXml(post.description)}</description>`,
				'    </item>',
			].join('\n');
		})
		.join('\n');

	const xml = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
		'  <channel>',
		'    <title>Blog | Sebastian Urdanegui</title>',
		`    <link>${SITE_URL}/blog</link>`,
		'    <description>Practical guides on React, Next.js and Python packages I have built.</description>',
		'    <language>en</language>',
		`    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />`,
		items,
		'  </channel>',
		'</rss>',
	].join('\n');

	return new Response(xml, {
		headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
	});
}
