import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/config';
import NavBar from '@/components/nav/NavBar';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(params.locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={params.locale}>
      <body className="min-h-screen bg-almond">
        <NextIntlClientProvider messages={messages}>
          <NavBar locale={params.locale as Locale} />
          <main className="max-w-lg mx-auto px-4 pb-16">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
