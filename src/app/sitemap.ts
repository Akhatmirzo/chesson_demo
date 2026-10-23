import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// Statik eksport: build vaqtida /sitemap.xml fayli bo'lib chiqadi
export const dynamic = 'force-static';

/** Ikki til sahifasi, har biri bir-birining tarjimasi sifatida (hreflang); sana — build (deploy) vaqti */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { uz: `${SITE_URL}/`, ru: `${SITE_URL}/ru` };
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'weekly', priority: 1, alternates: { languages } },
    { url: `${SITE_URL}/ru`, lastModified, changeFrequency: 'weekly', priority: 0.9, alternates: { languages } },
  ];
}
