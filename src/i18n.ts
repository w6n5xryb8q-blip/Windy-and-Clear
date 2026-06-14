import { getRequestConfig } from 'next-intl/server';
import { locales } from './config';

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = (locales.includes(locale as 'en' | 'es') ? locale : 'en') as string;

  const messages = locales.includes(locale as 'en' | 'es')
    ? (await import(`../messages/${safeLocale}.json`)).default
    : {};

  return { locale: safeLocale, messages };
});
