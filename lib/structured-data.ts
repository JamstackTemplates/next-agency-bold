import { business } from '../content/business.ts';
import { services } from '../content/services.ts';
import { absoluteUrl } from './paths.ts';

/**
 * Schema.org ProfessionalService JSON-LD derived directly from typed content files.
 * Includes foundingDate, openingHoursSpecification, knowsAbout and makesOffer (GBP minimum fees).
 */
export function businessStructuredData() {
  const url = absoluteUrl('/');

  const openingHoursSpecification = business.hours
    .filter((entry): entry is { day: typeof entry.day; opens: string; closes: string } => Boolean(entry.opens && entry.closes))
    .map(entry => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${entry.day}`,
      opens: entry.opens,
      closes: entry.closes,
    }));

  const makesOffer = services.map(service => ({
    '@type': 'Offer',
    name: service.name,
    description: service.pitch,
    itemOffered: {
      '@type': 'Service',
      name: service.name,
      description: service.pitch,
    },
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: service.fromFee,
      priceCurrency: 'GBP',
      valueAddedTaxIncluded: false,
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: business.name,
    description: business.introduction,
    ...(url ? { url } : {}),
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    foundingDate: String(business.foundedYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      postalCode: business.address.postalCode,
      addressCountry: business.address.countryCode,
    },
    openingHoursSpecification,
    knowsAbout: services.map(service => service.name),
    makesOffer,
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
