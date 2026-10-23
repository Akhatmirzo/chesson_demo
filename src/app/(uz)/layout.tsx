import type { ReactNode } from 'react';
import { buildMetadata, RootDocument } from '@/lib/document';

export { viewport } from '@/lib/document';
export const metadata = buildMetadata('uz');

export default function UzLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="uz">{children}</RootDocument>;
}
