import { redirect, notFound } from 'next/navigation';
import { getNeighborhoodByZip } from '@/data/neighborhoods';

interface Props {
  params: { locale: string; zip: string };
}

export default function ZipRedirectPage({ params }: Props) {
  const { locale, zip } = params;

  if (!/^\d{5}$/.test(zip)) notFound();

  const hood = getNeighborhoodByZip(zip);
  if (hood) {
    redirect(`/${locale}/neighborhood/${hood.slug}`);
  }

  redirect(`/${locale}/neighborhood/loop`);
}
