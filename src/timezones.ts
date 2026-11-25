/** Bundled timezone catalog: offset|description|ids groups (an empty offset repeats the previous one), decoded on first use. Offsets are standard (non-DST) hours. */
const PACKED =
  '-12|GMT-12:00|Etc/GMT+12;-11|Samoa Standard Time|Pacific/Midway,Pacific/Pago_Pago,Pacific/Samoa,US/Samoa;|GMT-11:00|Etc/GMT+11;-10|Hawaii Standard Time|Pacific/Honolulu,US/Hawaii;|Cook Is. Time|Pacific/Rarotonga;|Tahiti Time|Pacific/Tahiti;|GMT-10:00|Etc/GMT+10;-9|Alaska Standard Time|US/Alaska,America/Anchorage,America/Juneau,America/Nome,America/Yakutat;|Gambier Time|Pacific/Gambier;|GMT-09:00|Etc/GMT+9;-8|Pacific Standard Time|US/Pacific,America/Los_Angeles,America/Vancouver,America/Tijuana;|Pitcairn Standard Time|Pacific/Pitcairn;|GMT-08:00|Etc/GMT+8;-7|Mountain Standard Time|US/Mountain,America/Denver,America/Phoenix,America/Calgary,America/Edmonton,US/Arizona;|GMT-07:00|Etc/GMT+7;-6|Central Standard Time|US/Central,America/Chicago,America/Mexico_City,America/Winnipeg,America/Guatemala;|Easter Is. Time|Pacific/Easter;|GMT-06:00|Etc/GMT+6;-5|Eastern Standard Time|US/Eastern,America/New_York,America/Toronto,America/Montreal;|Colombia Time|America/Bogota;|Peru Time|America/Lima;|Eastern Standard Time|America/Panama;|GMT-05:00|Etc/GMT+5;-4|Venezuela Time|America/Caracas;|Chile Time|America/Santiago;|Bolivia Time|America/La_Paz;|Atlantic Standard Time|America/Halifax,America/Barbados,Atlantic/Bermuda;|GMT-04:00|Etc/GMT+4;-3|Brazil Time|America/Sao_Paulo;|Argentina Time|America/Buenos_Aires;|Uruguay Time|America/Montevideo;|French Guiana Time|America/Cayenne;|West Greenland Time|America/Godthab;|GMT-03:00|Etc/GMT+3;-2|Fernando de Noronha Time|America/Noronha;|South Georgia Time|Atlantic/South_Georgia;|GMT-02:00|Etc/GMT+2;-1|Azores Time|Atlantic/Azores;|Cape Verde Time|Atlantic/Cape_Verde;|GMT-01:00|Etc/GMT+1;0|Coordinated Universal Time|UTC;|Greenwich Mean Time|GMT,Europe/London;|Irish Standard Time|Europe/Dublin;|Western European Time|Africa/Casablanca;|Greenwich Mean Time|Atlantic/Reykjavik;|GMT|Etc/GMT;1|Central European Time|Europe/Paris,Europe/Berlin,Europe/Rome,Europe/Madrid,Europe/Amsterdam,Europe/Brussels,Europe/Vienna,Europe/Zurich;|West Africa Time|Africa/Lagos;|GMT+01:00|Etc/GMT-1;2|Eastern European Time|Europe/Helsinki,Europe/Athens;|Turkey Time|Europe/Istanbul;|Eastern European Time|Europe/Kiev,Africa/Cairo;|South Africa Standard Time|Africa/Johannesburg;|Israel Standard Time|Asia/Jerusalem;|GMT+02:00|Etc/GMT-2;3|Moscow Standard Time|Europe/Moscow;|Arabia Standard Time|Asia/Riyadh,Asia/Kuwait,Asia/Baghdad;|East Africa Time|Africa/Nairobi,Indian/Antananarivo;|GMT+03:00|Etc/GMT-3;3.5|Iran Standard Time|Asia/Tehran;4|Gulf Standard Time|Asia/Dubai,Asia/Muscat;|Azerbaijan Time|Asia/Baku;|Georgia Time|Asia/Tbilisi;|Mauritius Time|Indian/Mauritius;|GMT+04:00|Etc/GMT-4;4.5|Afghanistan Time|Asia/Kabul;5|Pakistan Standard Time|Asia/Karachi;|Uzbekistan Time|Asia/Tashkent;|Yekaterinburg Time|Asia/Yekaterinburg;|Maldives Time|Indian/Maldives;|GMT+05:00|Etc/GMT-5;5.5|India Standard Time|Asia/Kolkata;|Sri Lanka Time|Asia/Colombo;5.75|Nepal Time|Asia/Kathmandu;6|East Kazakhstan Time|Asia/Almaty;|Bangladesh Time|Asia/Dhaka;|Omsk Time|Asia/Omsk;|Indian Ocean Time|Indian/Chagos;|GMT+06:00|Etc/GMT-6;6.5|Myanmar Time|Asia/Rangoon;|Cocos Islands Time|Indian/Cocos;7|Indochina Time|Asia/Bangkok;|West Indonesia Time|Asia/Jakarta;|Indochina Time|Asia/Ho_Chi_Minh;|Krasnoyarsk Time|Asia/Krasnoyarsk;|GMT+07:00|Etc/GMT-7;8|China Standard Time|Asia/Shanghai;|Hong Kong Time|Asia/Hong_Kong;|Singapore Time|Asia/Singapore;|China Standard Time|Asia/Taipei;|Philippine Time|Asia/Manila;|Malaysia Time|Asia/Kuala_Lumpur;|Western Standard Time (Australia)|Australia/Perth;|Irkutsk Time|Asia/Irkutsk;|GMT+08:00|Etc/GMT-8;9|Japan Standard Time|Asia/Tokyo;|Korea Standard Time|Asia/Seoul;|Yakutsk Time|Asia/Yakutsk;|Palau Time|Pacific/Palau;|GMT+09:00|Etc/GMT-9;9.5|Central Standard Time (South Australia)|Australia/Adelaide;|Central Standard Time (Northern Territory)|Australia/Darwin;10|Eastern Standard Time (New South Wales)|Australia/Sydney;|Eastern Standard Time (Victoria)|Australia/Melbourne;|Eastern Standard Time (Queensland)|Australia/Brisbane;|Eastern Standard Time (Tasmania)|Australia/Hobart;|Chamorro Standard Time|Pacific/Guam;|Vladivostok Time|Asia/Vladivostok;|GMT+10:00|Etc/GMT-10;10.5|Lord Howe Standard Time|Australia/Lord_Howe;11|Norfolk Time|Pacific/Norfolk;|Magadan Time|Asia/Magadan;|New Caledonia Time|Pacific/Noumea;|GMT+11:00|Etc/GMT-11;12|New Zealand Standard Time|Pacific/Auckland;|Fiji Time|Pacific/Fiji;|Kamchatka Time|Asia/Kamchatka;|Gilbert Is. Time|Pacific/Tarawa;|GMT+12:00|Etc/GMT-12;12.75|Chatham Standard Time|Pacific/Chatham;13|Tonga Time|Pacific/Tongatapu;|West Samoa Time|Pacific/Apia;|GMT+13:00|Etc/GMT-13;14|Line Is. Time|Pacific/Kiritimati;|GMT+14:00|Etc/GMT-14';

type TimezoneEntry = { id: string; offset: number; description: string };
let catalog: TimezoneEntry[] | undefined;

/** The decoded catalog, shared and never handed out directly. */
export function timezoneCatalog(): TimezoneEntry[] {
  let offset = 0;
  return (catalog ||= PACKED.split(';').flatMap((group) => {
    const [hours, description, ids] = group.split('|');
    if (hours) offset = +hours;
    return ids.split(',').map((id) => ({ id, offset, description }));
  }));
}

const copies = (entries: TimezoneEntry[]) => entries.map((tz) => ({ ...tz }));

/** Catalog entry for an IANA identifier, or null when it is not bundled. */
export function getTimezoneInfo(timezoneId: string): TimezoneEntry | null {
  const found = timezoneCatalog().find((tz) => tz.id === timezoneId);
  return found ? { ...found } : null;
}

/**
 * Get all available timezones filtered by region
 * @param region - Region to filter by (e.g., 'America', 'Europe', 'Asia')
 * @returns Array of timezone objects in the specified region
 */
export function getTimezonesByRegion(region: string): Array<{
  id: string;
  offset: number;
  description: string;
}> {
  return copies(timezoneCatalog().filter((tz) => tz.id.startsWith(region + '/')));
}

/**
 * Search timezones by description or ID
 * @param query - Search query
 * @returns Array of matching timezone objects
 */
export function searchTimezones(query: string): Array<{
  id: string;
  offset: number;
  description: string;
}> {
  const searchTerm = query.toLowerCase();
  return copies(
    timezoneCatalog().filter(
      (tz) =>
        tz.id.toLowerCase().includes(searchTerm) ||
        tz.description.toLowerCase().includes(searchTerm),
    ),
  );
}

/**
 * Get timezones by GMT offset
 * @param offset - GMT offset in hours
 * @returns Array of timezone objects with the specified offset
 */
export function getTimezonesByOffset(offset: number): Array<{
  id: string;
  offset: number;
  description: string;
}> {
  return copies(timezoneCatalog().filter((tz) => tz.offset === offset));
}
