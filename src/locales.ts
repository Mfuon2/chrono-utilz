/**
 * Standard locale definitions based on IANA language tags
 * Comprehensive list of locale codes with their corresponding languages and regions
 */

export interface Locale {
  code: string;
  language: string;
  region: string;
  nativeName?: string;
}

export interface LocalesByRegion {
  [region: string]: string[];
}

// All standard locale codes
export const STANDARD_LOCALES: readonly string[] = [
  'aa-ER', 'af-NA', 'af-ZA', 'am-ET', 'ar-AE', 'ar-BH', 'ar-DJ', 'ar-DZ', 'ar-EG', 'ar-ER',
  'ar-IL', 'ar-IQ', 'ar-JO', 'ar-KM', 'ar-KW', 'ar-LB', 'ar-LY', 'ar-MA', 'ar-MR', 'ar-OM',
  'ar-PS', 'ar-QA', 'ar-SA', 'ar-SD', 'ar-SO', 'ar-SY', 'ar-TD', 'ar-TN', 'ar-YE', 'ay-BO',
  'az-AZ', 'be-BY', 'bg-BG', 'bi-VU', 'bn-BD', 'bs-BA', 'bs-ME', 'byn-ER', 'ca-AD', 'ch-GU',
  'ch-MP', 'cs-CZ', 'da-DK', 'de-AT', 'de-BE', 'de-CH', 'de-DE', 'de-LI', 'de-LU', 'de-VA',
  'dv-MV', 'dz-BT', 'el-CY', 'el-GR', 'en-AG', 'en-AI', 'en-AQ', 'en-AS', 'en-AU', 'en-BB',
  'en-BM', 'en-BS', 'en-BW', 'en-BZ', 'en-CA', 'en-CC', 'en-CK', 'en-CM', 'en-CW', 'en-CX',
  'en-DM', 'en-ER', 'en-FJ', 'en-FK', 'en-FM', 'en-GB', 'en-GD', 'en-GG', 'en-GH', 'en-GI',
  'en-GM', 'en-GS', 'en-GU', 'en-GY', 'en-HM', 'en-IE', 'en-IM', 'en-IN', 'en-IO', 'en-JE',
  'en-JM', 'en-KE', 'en-KI', 'en-KN', 'en-KY', 'en-LC', 'en-LR', 'en-LS', 'en-MG', 'en-MH',
  'en-MP', 'en-MS', 'en-MT', 'en-MU', 'en-MW', 'en-NA', 'en-NF', 'en-NG', 'en-NR', 'en-NU',
  'en-NZ', 'en-PG', 'en-PH', 'en-PK', 'en-PN', 'en-PR', 'en-PW', 'en-RW', 'en-SB', 'en-SC',
  'en-SD', 'en-SG', 'en-SH', 'en-SL', 'en-SS', 'en-SX', 'en-SZ', 'en-TC', 'en-TK', 'en-TO',
  'en-TT', 'en-TV', 'en-TZ', 'en-UG', 'en-UM', 'en-US', 'en-VC', 'en-VG', 'en-VI', 'en-VU',
  'en-WS', 'en-ZA', 'en-ZM', 'en-ZW', 'es-AR', 'es-BO', 'es-CL', 'es-CO', 'es-CR', 'es-CU',
  'es-DO', 'es-EA', 'es-EC', 'es-ES', 'es-GQ', 'es-GT', 'es-HN', 'es-IC', 'es-MX', 'es-NI',
  'es-PA', 'es-PE', 'es-PH', 'es-PR', 'es-PY', 'es-SV', 'es-US', 'es-UY', 'es-VE', 'et-EE',
  'eu-ES', 'fa-AF', 'fa-IR', 'ff-SN', 'fi-FI', 'fj-FJ', 'fo-FO', 'fr-BE', 'fr-BF', 'fr-BI',
  'fr-BJ', 'fr-BL', 'fr-CA', 'fr-CD', 'fr-CF', 'fr-CG', 'fr-CH', 'fr-CI', 'fr-CM', 'fr-DJ',
  'fr-DZ', 'fr-FR', 'fr-GA', 'fr-GF', 'fr-GN', 'fr-GP', 'fr-GQ', 'fr-HT', 'fr-KM', 'fr-LU',
  'fr-MA', 'fr-MC', 'fr-MF', 'fr-MG', 'fr-ML', 'fr-MQ', 'fr-MR', 'fr-MU', 'fr-NC', 'fr-NE',
  'fr-PF', 'fr-PM', 'fr-RE', 'fr-RW', 'fr-SC', 'fr-SN', 'fr-SY', 'fr-TD', 'fr-TG', 'fr-TN',
  'fr-VU', 'fr-WF', 'fr-YT', 'fy-NL', 'ga-IE', 'gd-GB', 'gl-ES', 'gn-PY', 'gu-IN', 'gv-IM',
  'ha-GH', 'ha-NE', 'ha-NG', 'he-IL', 'hi-IN', 'ho-PG', 'hr-BA', 'hr-HR', 'ht-HT', 'hu-HU',
  'hy-AM', 'id-ID', 'ie-EE', 'ig-NG', 'ii-CN', 'is-IS', 'it-CH', 'it-IT', 'it-SM', 'it-VA',
  'ja-JP', 'ka-GE', 'kg-CD', 'kk-KZ', 'kl-GL', 'km-KH', 'kn-IN', 'ko-KP', 'ko-KR', 'ku-TR',
  'kw-GB', 'ky-KG', 'la-VA', 'lb-LU', 'lg-UG', 'ln-CD', 'ln-CF', 'lo-LA', 'lt-LT', 'lu-CD',
  'lv-LV', 'mg-MG', 'mh-MH', 'mi-NZ', 'mk-MK', 'ml-IN', 'mn-MN', 'mr-IN', 'ms-BN', 'ms-MY',
  'ms-SG', 'mt-MT', 'my-MM', 'na-NR', 'nb-NO', 'nb-SJ', 'nd-ZW', 'ne-IN', 'ne-NP', 'nl-AW',
  'nl-BE', 'nl-BQ', 'nl-CW', 'nl-NL', 'nl-SR', 'nl-SX', 'nn-NO', 'no-NO', 'nr-ZA', 'nso-ZA',
  'ny-MW', 'oc-FR', 'om-ET', 'om-KE', 'or-IN', 'os-GE', 'pa-IN', 'pa-PK', 'pl-PL', 'ps-AF',
  'pt-AO', 'pt-BR', 'pt-CV', 'pt-GW', 'pt-MO', 'pt-MZ', 'pt-PT', 'pt-ST', 'pt-TL', 'qu-BO',
  'qu-EC', 'qu-PE', 'rm-CH', 'rn-BI', 'ro-MD', 'ro-RO', 'ru-BY', 'ru-KG', 'ru-KZ', 'ru-MD',
  'ru-RU', 'ru-UA', 'rw-RW', 'sa-IN', 'sc-IT', 'sd-PK', 'se-FI', 'se-NO', 'se-SE', 'sg-CF',
  'si-LK', 'sk-SK', 'sl-SI', 'sm-AS', 'sm-WS', 'sn-ZW', 'so-DJ', 'so-ET', 'so-KE', 'so-SO',
  'sq-AL', 'sq-MK', 'sr-BA', 'sr-ME', 'sr-RS', 'ss-SZ', 'ss-ZA', 'st-LS', 'st-ZA', 'sv-AX',
  'sv-FI', 'sv-SE', 'sw-CD', 'sw-KE', 'sw-TZ', 'sw-UG', 'ta-IN', 'ta-LK', 'ta-MY', 'ta-SG',
  'te-IN', 'tg-TJ', 'th-TH', 'ti-ER', 'ti-ET', 'tk-TM', 'tl-PH', 'tn-BW', 'tn-ZA', 'to-TO',
  'tr-CY', 'tr-TR', 'ts-ZA', 'tt-RU', 'ty-PF', 'ug-CN', 'uk-UA', 'ur-IN', 'ur-PK', 'uz-AF',
  'uz-UZ', 've-ZA', 'vi-VN', 'wo-SN', 'xh-ZA', 'yi-001', 'yo-BJ', 'yo-NG', 'zh-CN', 'zh-HK',
  'zh-MO', 'zh-SG', 'zh-TW', 'zu-ZA'
] as const;

// Commonly used locales grouped by region for easier access
export const LOCALES_BY_REGION: LocalesByRegion = {
  'North America': [
    'en-US', 'en-CA', 'es-MX', 'fr-CA', 'es-US'
  ],
  'Europe': [
    'en-GB', 'fr-FR', 'de-DE', 'it-IT', 'es-ES', 'pt-PT', 'nl-NL', 'sv-SE', 
    'da-DK', 'no-NO', 'fi-FI', 'pl-PL', 'ru-RU', 'de-AT', 'de-CH', 'fr-BE',
    'nl-BE', 'it-CH', 'cs-CZ', 'sk-SK', 'hu-HU', 'ro-RO', 'bg-BG', 'hr-HR',
    'sl-SI', 'et-EE', 'lv-LV', 'lt-LT', 'el-GR', 'mt-MT', 'ga-IE', 'cy-GB',
    'is-IS', 'fo-FO', 'eu-ES', 'ca-ES', 'gl-ES'
  ],
  'Asia': [
    'ja-JP', 'ko-KR', 'zh-CN', 'zh-TW', 'zh-HK', 'hi-IN', 'th-TH', 'id-ID', 
    'vi-VN', 'ms-MY', 'tl-PH', 'ur-PK', 'bn-BD', 'ta-IN', 'te-IN', 'ml-IN',
    'kn-IN', 'gu-IN', 'or-IN', 'pa-IN', 'as-IN', 'ne-NP', 'si-LK', 'my-MM',
    'km-KH', 'lo-LA', 'ka-GE', 'hy-AM', 'az-AZ', 'kk-KZ', 'ky-KG', 'uz-UZ',
    'tg-TJ', 'tk-TM', 'mn-MN', 'ug-CN', 'bo-CN'
  ],
  'South America': [
    'pt-BR', 'es-AR', 'es-CO', 'es-CL', 'es-PE', 'es-VE', 'es-EC', 'es-UY', 
    'es-PY', 'es-BO', 'fr-GF', 'nl-SR', 'en-GY'
  ],
  'Africa': [
    'ar-EG', 'ar-MA', 'ar-DZ', 'ar-TN', 'ar-LY', 'ar-SD', 'ar-SO', 'sw-KE', 
    'sw-TZ', 'sw-UG', 'af-ZA', 'en-ZA', 'fr-SN', 'fr-CI', 'fr-ML', 'fr-BF',
    'fr-NE', 'fr-TD', 'fr-CF', 'fr-CD', 'fr-CG', 'fr-GA', 'fr-CM', 'fr-DJ',
    'fr-MG', 'fr-RW', 'fr-BI', 'pt-AO', 'pt-MZ', 'pt-CV', 'pt-GW', 'pt-ST',
    'am-ET', 'ti-ET', 'om-ET', 'so-SO', 'ar-ER', 'ti-ER'
  ],
  'Oceania': [
    'en-AU', 'en-NZ', 'en-FJ', 'en-PG', 'en-SB', 'en-VU', 'en-NC', 'en-PF',
    'en-WS', 'en-TO', 'en-KI', 'en-TV', 'en-NR', 'en-MH', 'en-FM', 'en-PW',
    'mi-NZ', 'fj-FJ', 'sm-WS', 'to-TO', 'ty-PF'
  ],
  'Middle East': [
    'ar-SA', 'ar-AE', 'ar-QA', 'ar-KW', 'ar-BH', 'ar-OM', 'ar-YE', 'ar-JO',
    'ar-LB', 'ar-SY', 'ar-IQ', 'ar-IL', 'ar-PS', 'he-IL', 'fa-IR', 'fa-AF',
    'tr-TR', 'ku-TR'
  ]
};

// Export type for locale validation
export type StandardLocale = typeof STANDARD_LOCALES[number];

// Utility functions
export function isValidLocale(locale: string): locale is StandardLocale {
  return STANDARD_LOCALES.includes(locale as StandardLocale);
}

export function getLocalesByRegion(region: string): string[] {
  return LOCALES_BY_REGION[region] || [];
}

export function getAllRegions(): string[] {
  return Object.keys(LOCALES_BY_REGION);
}

export function getRegionForLocale(locale: string): string | null {
  for (const [region, locales] of Object.entries(LOCALES_BY_REGION)) {
    if (locales.includes(locale)) {
      return region;
    }
  }
  return null;
}

// Default export for convenience
export default {
  STANDARD_LOCALES,
  LOCALES_BY_REGION,
  isValidLocale,
  getLocalesByRegion,
  getAllRegions,
  getRegionForLocale
};