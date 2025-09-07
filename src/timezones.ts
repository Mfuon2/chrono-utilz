/**
 * Standardized IANA Timezone Database
 * Based on IBM Cloud Pak System W4600 timezone list
 * https://www.ibm.com/docs/en/cloud-pak-system-w4600/2.3.3?topic=SSDLT6_2.3.3/psapsys_restapi/time_zone_list.htm
 */

/**
 * Complete IANA timezone database with standardized offsets and descriptions
 */
export const TIMEZONES = [
    // GMT-12 to GMT-11
    { id: "Etc/GMT+12", offset: -12, description: "GMT-12:00" },
    { id: "Pacific/Midway", offset: -11, description: "Samoa Standard Time" },
    { id: "Pacific/Pago_Pago", offset: -11, description: "Samoa Standard Time" },
    { id: "Pacific/Samoa", offset: -11, description: "Samoa Standard Time" },
    { id: "US/Samoa", offset: -11, description: "Samoa Standard Time" },
    { id: "Etc/GMT+11", offset: -11, description: "GMT-11:00" },
    
    // GMT-10
    { id: "Pacific/Honolulu", offset: -10, description: "Hawaii Standard Time" },
    { id: "US/Hawaii", offset: -10, description: "Hawaii Standard Time" },
    { id: "Pacific/Rarotonga", offset: -10, description: "Cook Is. Time" },
    { id: "Pacific/Tahiti", offset: -10, description: "Tahiti Time" },
    { id: "Etc/GMT+10", offset: -10, description: "GMT-10:00" },
    
    // GMT-9
    { id: "US/Alaska", offset: -9, description: "Alaska Standard Time" },
    { id: "America/Anchorage", offset: -9, description: "Alaska Standard Time" },
    { id: "America/Juneau", offset: -9, description: "Alaska Standard Time" },
    { id: "America/Nome", offset: -9, description: "Alaska Standard Time" },
    { id: "America/Yakutat", offset: -9, description: "Alaska Standard Time" },
    { id: "Pacific/Gambier", offset: -9, description: "Gambier Time" },
    { id: "Etc/GMT+9", offset: -9, description: "GMT-09:00" },
    
    // GMT-8
    { id: "US/Pacific", offset: -8, description: "Pacific Standard Time" },
    { id: "America/Los_Angeles", offset: -8, description: "Pacific Standard Time" },
    { id: "America/Vancouver", offset: -8, description: "Pacific Standard Time" },
    { id: "America/Tijuana", offset: -8, description: "Pacific Standard Time" },
    { id: "Pacific/Pitcairn", offset: -8, description: "Pitcairn Standard Time" },
    { id: "Etc/GMT+8", offset: -8, description: "GMT-08:00" },
    
    // GMT-7
    { id: "US/Mountain", offset: -7, description: "Mountain Standard Time" },
    { id: "America/Denver", offset: -7, description: "Mountain Standard Time" },
    { id: "America/Phoenix", offset: -7, description: "Mountain Standard Time" },
    { id: "America/Calgary", offset: -7, description: "Mountain Standard Time" },
    { id: "America/Edmonton", offset: -7, description: "Mountain Standard Time" },
    { id: "US/Arizona", offset: -7, description: "Mountain Standard Time" },
    { id: "Etc/GMT+7", offset: -7, description: "GMT-07:00" },
    
    // GMT-6
    { id: "US/Central", offset: -6, description: "Central Standard Time" },
    { id: "America/Chicago", offset: -6, description: "Central Standard Time" },
    { id: "America/Mexico_City", offset: -6, description: "Central Standard Time" },
    { id: "America/Winnipeg", offset: -6, description: "Central Standard Time" },
    { id: "America/Guatemala", offset: -6, description: "Central Standard Time" },
    { id: "Pacific/Easter", offset: -6, description: "Easter Is. Time" },
    { id: "Etc/GMT+6", offset: -6, description: "GMT-06:00" },
    
    // GMT-5
    { id: "US/Eastern", offset: -5, description: "Eastern Standard Time" },
    { id: "America/New_York", offset: -5, description: "Eastern Standard Time" },
    { id: "America/Toronto", offset: -5, description: "Eastern Standard Time" },
    { id: "America/Montreal", offset: -5, description: "Eastern Standard Time" },
    { id: "America/Bogota", offset: -5, description: "Colombia Time" },
    { id: "America/Lima", offset: -5, description: "Peru Time" },
    { id: "America/Panama", offset: -5, description: "Eastern Standard Time" },
    { id: "Etc/GMT+5", offset: -5, description: "GMT-05:00" },
    
    // GMT-4
    { id: "America/Caracas", offset: -4, description: "Venezuela Time" },
    { id: "America/Santiago", offset: -4, description: "Chile Time" },
    { id: "America/La_Paz", offset: -4, description: "Bolivia Time" },
    { id: "America/Halifax", offset: -4, description: "Atlantic Standard Time" },
    { id: "America/Barbados", offset: -4, description: "Atlantic Standard Time" },
    { id: "Atlantic/Bermuda", offset: -4, description: "Atlantic Standard Time" },
    { id: "Etc/GMT+4", offset: -4, description: "GMT-04:00" },
    
    // GMT-3
    { id: "America/Sao_Paulo", offset: -3, description: "Brazil Time" },
    { id: "America/Buenos_Aires", offset: -3, description: "Argentina Time" },
    { id: "America/Montevideo", offset: -3, description: "Uruguay Time" },
    { id: "America/Cayenne", offset: -3, description: "French Guiana Time" },
    { id: "America/Godthab", offset: -3, description: "West Greenland Time" },
    { id: "Etc/GMT+3", offset: -3, description: "GMT-03:00" },
    
    // GMT-2
    { id: "America/Noronha", offset: -2, description: "Fernando de Noronha Time" },
    { id: "Atlantic/South_Georgia", offset: -2, description: "South Georgia Time" },
    { id: "Etc/GMT+2", offset: -2, description: "GMT-02:00" },
    
    // GMT-1
    { id: "Atlantic/Azores", offset: -1, description: "Azores Time" },
    { id: "Atlantic/Cape_Verde", offset: -1, description: "Cape Verde Time" },
    { id: "Etc/GMT+1", offset: -1, description: "GMT-01:00" },
    
    // GMT+0 (UTC/GMT)
    { id: "UTC", offset: 0, description: "Coordinated Universal Time" },
    { id: "GMT", offset: 0, description: "Greenwich Mean Time" },
    { id: "Europe/London", offset: 0, description: "Greenwich Mean Time" },
    { id: "Europe/Dublin", offset: 0, description: "Irish Standard Time" },
    { id: "Africa/Casablanca", offset: 0, description: "Western European Time" },
    { id: "Atlantic/Reykjavik", offset: 0, description: "Greenwich Mean Time" },
    { id: "Etc/GMT", offset: 0, description: "GMT" },
    
    // GMT+1
    { id: "Europe/Paris", offset: 1, description: "Central European Time" },
    { id: "Europe/Berlin", offset: 1, description: "Central European Time" },
    { id: "Europe/Rome", offset: 1, description: "Central European Time" },
    { id: "Europe/Madrid", offset: 1, description: "Central European Time" },
    { id: "Europe/Amsterdam", offset: 1, description: "Central European Time" },
    { id: "Europe/Brussels", offset: 1, description: "Central European Time" },
    { id: "Europe/Vienna", offset: 1, description: "Central European Time" },
    { id: "Europe/Zurich", offset: 1, description: "Central European Time" },
    { id: "Africa/Lagos", offset: 1, description: "West Africa Time" },
    { id: "Etc/GMT-1", offset: 1, description: "GMT+01:00" },
    
    // GMT+2
    { id: "Europe/Helsinki", offset: 2, description: "Eastern European Time" },
    { id: "Europe/Athens", offset: 2, description: "Eastern European Time" },
    { id: "Europe/Istanbul", offset: 2, description: "Turkey Time" },
    { id: "Europe/Kiev", offset: 2, description: "Eastern European Time" },
    { id: "Africa/Cairo", offset: 2, description: "Eastern European Time" },
    { id: "Africa/Johannesburg", offset: 2, description: "South Africa Standard Time" },
    { id: "Asia/Jerusalem", offset: 2, description: "Israel Standard Time" },
    { id: "Etc/GMT-2", offset: 2, description: "GMT+02:00" },
    
    // GMT+3
    { id: "Europe/Moscow", offset: 3, description: "Moscow Standard Time" },
    { id: "Asia/Riyadh", offset: 3, description: "Arabia Standard Time" },
    { id: "Asia/Kuwait", offset: 3, description: "Arabia Standard Time" },
    { id: "Asia/Baghdad", offset: 3, description: "Arabia Standard Time" },
    { id: "Africa/Nairobi", offset: 3, description: "East Africa Time" },
    { id: "Indian/Antananarivo", offset: 3, description: "East Africa Time" },
    { id: "Etc/GMT-3", offset: 3, description: "GMT+03:00" },
    
    // GMT+3.5
    { id: "Asia/Tehran", offset: 3.5, description: "Iran Standard Time" },
    
    // GMT+4
    { id: "Asia/Dubai", offset: 4, description: "Gulf Standard Time" },
    { id: "Asia/Muscat", offset: 4, description: "Gulf Standard Time" },
    { id: "Asia/Baku", offset: 4, description: "Azerbaijan Time" },
    { id: "Asia/Tbilisi", offset: 4, description: "Georgia Time" },
    { id: "Indian/Mauritius", offset: 4, description: "Mauritius Time" },
    { id: "Etc/GMT-4", offset: 4, description: "GMT+04:00" },
    
    // GMT+4.5
    { id: "Asia/Kabul", offset: 4.5, description: "Afghanistan Time" },
    
    // GMT+5
    { id: "Asia/Karachi", offset: 5, description: "Pakistan Standard Time" },
    { id: "Asia/Tashkent", offset: 5, description: "Uzbekistan Time" },
    { id: "Asia/Yekaterinburg", offset: 5, description: "Yekaterinburg Time" },
    { id: "Indian/Maldives", offset: 5, description: "Maldives Time" },
    { id: "Etc/GMT-5", offset: 5, description: "GMT+05:00" },
    
    // GMT+5.5
    { id: "Asia/Kolkata", offset: 5.5, description: "India Standard Time" },
    { id: "Asia/Colombo", offset: 5.5, description: "Sri Lanka Time" },
    
    // GMT+5.75
    { id: "Asia/Kathmandu", offset: 5.75, description: "Nepal Time" },
    
    // GMT+6
    { id: "Asia/Almaty", offset: 6, description: "East Kazakhstan Time" },
    { id: "Asia/Dhaka", offset: 6, description: "Bangladesh Time" },
    { id: "Asia/Omsk", offset: 6, description: "Omsk Time" },
    { id: "Indian/Chagos", offset: 6, description: "Indian Ocean Time" },
    { id: "Etc/GMT-6", offset: 6, description: "GMT+06:00" },
    
    // GMT+6.5
    { id: "Asia/Rangoon", offset: 6.5, description: "Myanmar Time" },
    { id: "Indian/Cocos", offset: 6.5, description: "Cocos Islands Time" },
    
    // GMT+7
    { id: "Asia/Bangkok", offset: 7, description: "Indochina Time" },
    { id: "Asia/Jakarta", offset: 7, description: "West Indonesia Time" },
    { id: "Asia/Ho_Chi_Minh", offset: 7, description: "Indochina Time" },
    { id: "Asia/Krasnoyarsk", offset: 7, description: "Krasnoyarsk Time" },
    { id: "Etc/GMT-7", offset: 7, description: "GMT+07:00" },
    
    // GMT+8
    { id: "Asia/Shanghai", offset: 8, description: "China Standard Time" },
    { id: "Asia/Hong_Kong", offset: 8, description: "Hong Kong Time" },
    { id: "Asia/Singapore", offset: 8, description: "Singapore Time" },
    { id: "Asia/Taipei", offset: 8, description: "China Standard Time" },
    { id: "Asia/Manila", offset: 8, description: "Philippine Time" },
    { id: "Asia/Kuala_Lumpur", offset: 8, description: "Malaysia Time" },
    { id: "Australia/Perth", offset: 8, description: "Western Standard Time (Australia)" },
    { id: "Asia/Irkutsk", offset: 8, description: "Irkutsk Time" },
    { id: "Etc/GMT-8", offset: 8, description: "GMT+08:00" },
    
    // GMT+9
    { id: "Asia/Tokyo", offset: 9, description: "Japan Standard Time" },
    { id: "Asia/Seoul", offset: 9, description: "Korea Standard Time" },
    { id: "Asia/Yakutsk", offset: 9, description: "Yakutsk Time" },
    { id: "Pacific/Palau", offset: 9, description: "Palau Time" },
    { id: "Etc/GMT-9", offset: 9, description: "GMT+09:00" },
    
    // GMT+9.5
    { id: "Australia/Adelaide", offset: 9.5, description: "Central Standard Time (South Australia)" },
    { id: "Australia/Darwin", offset: 9.5, description: "Central Standard Time (Northern Territory)" },
    
    // GMT+10
    { id: "Australia/Sydney", offset: 10, description: "Eastern Standard Time (New South Wales)" },
    { id: "Australia/Melbourne", offset: 10, description: "Eastern Standard Time (Victoria)" },
    { id: "Australia/Brisbane", offset: 10, description: "Eastern Standard Time (Queensland)" },
    { id: "Australia/Hobart", offset: 10, description: "Eastern Standard Time (Tasmania)" },
    { id: "Pacific/Guam", offset: 10, description: "Chamorro Standard Time" },
    { id: "Asia/Vladivostok", offset: 10, description: "Vladivostok Time" },
    { id: "Etc/GMT-10", offset: 10, description: "GMT+10:00" },
    
    // GMT+10.5
    { id: "Australia/Lord_Howe", offset: 10.5, description: "Lord Howe Standard Time" },
    
    // GMT+11
    { id: "Pacific/Norfolk", offset: 11, description: "Norfolk Time" },
    { id: "Asia/Magadan", offset: 11, description: "Magadan Time" },
    { id: "Pacific/Noumea", offset: 11, description: "New Caledonia Time" },
    { id: "Etc/GMT-11", offset: 11, description: "GMT+11:00" },
    
    // GMT+12
    { id: "Pacific/Auckland", offset: 12, description: "New Zealand Standard Time" },
    { id: "Pacific/Fiji", offset: 12, description: "Fiji Time" },
    { id: "Asia/Kamchatka", offset: 12, description: "Kamchatka Time" },
    { id: "Pacific/Tarawa", offset: 12, description: "Gilbert Is. Time" },
    { id: "Etc/GMT-12", offset: 12, description: "GMT+12:00" },
    
    // GMT+12.75
    { id: "Pacific/Chatham", offset: 12.75, description: "Chatham Standard Time" },
    
    // GMT+13
    { id: "Pacific/Tongatapu", offset: 13, description: "Tonga Time" },
    { id: "Pacific/Apia", offset: 13, description: "West Samoa Time" },
    { id: "Etc/GMT-13", offset: 13, description: "GMT+13:00" },
    
    // GMT+14
    { id: "Pacific/Kiritimati", offset: 14, description: "Line Is. Time" },
    { id: "Etc/GMT-14", offset: 14, description: "GMT+14:00" }
];

/**
 * Get user's current timezone using Intl API
 * @returns {string} The user's IANA timezone identifier
 */
export function getUserTimezone() {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (error) {
        // Fallback to UTC if Intl API is not available
        return 'UTC';
    }
}

/**
 * Get timezone information by IANA identifier
 * @param timezoneId - IANA timezone identifier
 * @returns Timezone information or null if not found
 */
export function getTimezoneInfo(timezoneId: string): { id: string; offset: number; description: string } | null {
    return TIMEZONES.find(tz => tz.id === timezoneId) || null;
}

/**
 * Get timezone offset in hours for a given timezone
 * @param timezoneId - IANA timezone identifier
 * @param date - Date to check (for DST calculations)
 * @returns Offset in hours from UTC
 */
export function getTimezoneOffset(timezoneId: string, date: Date = new Date()): number {
    try {
        // Use Intl API for accurate offset calculation including DST
        const utc = new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
        const targetTime = new Date(utc.toLocaleString('en-US', { timeZone: timezoneId }));
        const offset = (targetTime.getTime() - utc.getTime()) / (1000 * 60 * 60);
        return offset;
    } catch (error) {
        // Fallback to static offset from our database
        const tzInfo = getTimezoneInfo(timezoneId);
        return tzInfo ? tzInfo.offset : 0;
    }
}

/**
 * Convert date from one timezone to another
 * @param date - Source date
 * @param fromTimezone - Source timezone IANA ID
 * @param toTimezone - Target timezone IANA ID
 * @returns Converted date
 */
export function convertTimezone(date: Date, fromTimezone: string, toTimezone: string): Date {
    try {
        // Get the time in the source timezone
        const utcTime = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
        const sourceTime = new Date(date.toLocaleString('en-US', { timeZone: fromTimezone }));
        const targetTime = new Date(date.toLocaleString('en-US', { timeZone: toTimezone }));
        
        // Calculate the difference and apply to original date
        const sourceDiff = sourceTime.getTime() - utcTime.getTime();
        const targetDiff = targetTime.getTime() - utcTime.getTime();
        const adjustment = targetDiff - sourceDiff;
        
        return new Date(date.getTime() + adjustment);
    } catch (error) {
        // Fallback to offset-based calculation
        const fromOffset = getTimezoneOffset(fromTimezone, date);
        const toOffset = getTimezoneOffset(toTimezone, date);
        const offsetDiff = (toOffset - fromOffset) * 60 * 60 * 1000;
        
        return new Date(date.getTime() + offsetDiff);
    }
}

/**
 * Get all available timezones filtered by region
 * @param region - Region to filter by (e.g., 'America', 'Europe', 'Asia')
 * @returns Array of timezone objects in the specified region
 */
export function getTimezonesByRegion(region: string): Array<{ id: string; offset: number; description: string }> {
    return TIMEZONES.filter(tz => tz.id.startsWith(region + '/'));
}

/**
 * Search timezones by description or ID
 * @param query - Search query
 * @returns Array of matching timezone objects
 */
export function searchTimezones(query: string): Array<{ id: string; offset: number; description: string }> {
    const searchTerm = query.toLowerCase();
    return TIMEZONES.filter(tz => 
        tz.id.toLowerCase().includes(searchTerm) || 
        tz.description.toLowerCase().includes(searchTerm)
    );
}

/**
 * Get timezones by GMT offset
 * @param offset - GMT offset in hours
 * @returns Array of timezone objects with the specified offset
 */
export function getTimezonesByOffset(offset: number): Array<{ id: string; offset: number; description: string }> {
    return TIMEZONES.filter(tz => tz.offset === offset);
}

/**
 * Create a comprehensive timezone type for TypeScript
 */
export const TIMEZONE_IDS = TIMEZONES.map(tz => tz.id);

/**
 * Default timezone configuration
 */
export const DEFAULT_TIMEZONE_CONFIG = {
    userTimezone: getUserTimezone(),
    fallbackTimezone: 'UTC',
    autoDetect: true
};