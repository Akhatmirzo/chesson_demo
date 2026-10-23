import type { ReactNode } from 'react';
import { buildMetadata, RootDocument } from '@/lib/document';

export { viewport } from '@/lib/document';
export const metadata = buildMetadata('ru');

export default function RuLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="ru">{children}</RootDocument>;
}
