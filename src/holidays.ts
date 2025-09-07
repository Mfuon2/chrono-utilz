/**
 * Comprehensive holiday data for countries around the world
 * Organized alphabetically by ISO country code
 */

// TypeScript interfaces for holiday data
export interface Holiday {
  name: string;
  date: string;
  type: 'fixed' | 'calculated';
}

export interface CountryHolidays {
  name: string;
  holidays: Holiday[];
}

export type HolidayData = Record<string, CountryHolidays>;

// Holiday data structure:
// countryCode: {
//   name: "Official Country Name",
//   holidays: [
//     { name: "Holiday Name", date: "MM-DD" or "description for floating holidays", type: "fixed" | "calculated" }
//   ]
// }

export const holidays: HolidayData = {
  // A - Countries
  'AD': {
    name: "Andorra",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Epiphany", date: "01-06", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Whit Monday", date: "easter+50", type: "calculated" },
      { name: "Assumption Day", date: "08-15", type: "fixed" },
      { name: "National Day", date: "09-08", type: "fixed" },
      { name: "All Saints' Day", date: "11-01", type: "fixed" },
      { name: "Immaculate Conception", date: "12-08", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  'AE': {
    name: "United Arab Emirates",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Commemoration Day", date: "11-30", type: "fixed" },
      { name: "National Day", date: "12-02", type: "fixed" },
      { name: "National Day", date: "12-03", type: "fixed" }
    ]
  },
  'AF': {
    name: "Afghanistan",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Nowruz", date: "03-21", type: "fixed" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Victory Day", date: "05-08", type: "fixed" },
      { name: "Independence Day", date: "08-19", type: "fixed" },
      { name: "Islamic New Year", date: "islamic-new-year", type: "calculated" },
      { name: "Eid al-Fitr", date: "eid-al-fitr", type: "calculated" },
      { name: "Eid al-Adha", date: "eid-al-adha", type: "calculated" }
    ]
  },
  'AG': {
    name: "Antigua and Barbuda",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Caribbean Community Day", date: "07-02", type: "fixed" },
      { name: "Independence Day", date: "11-01", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  'AL': {
    name: "Albania",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "New Year's Day", date: "01-02", type: "fixed" },
      { name: "Summer Day", date: "03-14", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Mother Teresa Day", date: "10-19", type: "fixed" },
      { name: "Independence Day", date: "11-28", type: "fixed" },
      { name: "Liberation Day", date: "11-29", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  'AM': {
    name: "Armenia",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "New Year's Day", date: "01-02", type: "fixed" },
      { name: "Christmas Day", date: "01-06", type: "fixed" },
      { name: "Women's Day", date: "03-08", type: "fixed" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Victory and Peace Day", date: "05-09", type: "fixed" },
      { name: "Republic Day", date: "05-28", type: "fixed" },
      { name: "Constitution Day", date: "07-05", type: "fixed" },
      { name: "Independence Day", date: "09-21", type: "fixed" },
      { name: "New Year's Eve", date: "12-31", type: "fixed" }
    ]
  },
  
  // B - Countries
  'BA': {
    name: "Bosnia and Herzegovina",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "New Year's Day", date: "01-02", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Labour Day", date: "05-02", type: "fixed" },
      { name: "Statehood Day", date: "11-25", type: "fixed" },
      { name: "Independence Day", date: "03-01", type: "fixed" },
      { name: "Day of the Army of Republika Srpska", date: "01-09", type: "fixed" },
      { name: "Day of the Republic", date: "11-21", type: "fixed" }
    ]
  },
  'BB': {
    name: "Barbados",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Errol Barrow Day", date: "01-21", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Whit Monday", date: "easter+50", type: "calculated" },
      { name: "Emancipation Day", date: "08-01", type: "fixed" },
      { name: "Independence Day", date: "11-30", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  'BD': {
    name: "Bangladesh",
    holidays: [
      { name: "Bangabandhu Homecoming Day", date: "01-10", type: "fixed" },
      { name: "International Mother Language Day", date: "02-21", type: "fixed" },
      { name: "Independence Day", date: "03-26", type: "fixed" },
      { name: "Bengali New Year", date: "04-14", type: "fixed" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "National Mourning Day", date: "08-15", type: "fixed" },
      { name: "Victory Day", date: "12-16", type: "fixed" },
      { name: "Eid ul-Fitr", date: "eid-ul-fitr", type: "calculated" },
      { name: "Eid ul-Adha", date: "eid-ul-adha", type: "calculated" }
    ]
  },
  'BE': {
    name: "Belgium",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Ascension Day", date: "easter+39", type: "calculated" },
      { name: "Whit Sunday", date: "easter+49", type: "calculated" },
      { name: "Whit Monday", date: "easter+50", type: "calculated" },
      { name: "National Day", date: "07-21", type: "fixed" },
      { name: "Assumption Day", date: "08-15", type: "fixed" },
      { name: "All Saints' Day", date: "11-01", type: "fixed" },
      { name: "Armistice Day", date: "11-11", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  'BF': {
    name: "Burkina Faso",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Anniversary of the 1966 Revolution", date: "01-03", type: "fixed" },
      { name: "International Women's Day", date: "03-08", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Africa Day", date: "05-25", type: "fixed" },
      { name: "Independence Day", date: "08-05", type: "fixed" },
      { name: "All Saints' Day", date: "11-01", type: "fixed" },
      { name: "Prophet's Birthday", date: "prophet-birthday", type: "calculated" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  'BG': {
    name: "Bulgaria",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Liberation Day", date: "03-03", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "St. George's Day", date: "05-06", type: "fixed" },
      { name: "St. Cyril and St. Methodius Day", date: "05-24", type: "fixed" },
      { name: "Unification Day", date: "09-06", type: "fixed" },
      { name: "Independence Day", date: "09-22", type: "fixed" },
      { name: "Christmas Eve", date: "12-24", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  
  // C - Countries
  'CA': {
    name: "Canada",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Family Day", date: "third-monday-february", type: "calculated" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Victoria Day", date: "last-monday-may", type: "calculated" },
      { name: "Canada Day", date: "07-01", type: "fixed" },
      { name: "Civic Holiday", date: "first-monday-august", type: "calculated" },
      { name: "Labour Day", date: "first-monday-september", type: "calculated" },
      { name: "Thanksgiving", date: "second-monday-october", type: "calculated" },
      { name: "Remembrance Day", date: "11-11", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  'CH': {
    name: "Switzerland",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Ascension Day", date: "easter+39", type: "calculated" },
      { name: "Whit Sunday", date: "easter+49", type: "calculated" },
      { name: "Whit Monday", date: "easter+50", type: "calculated" },
      { name: "National Day", date: "08-01", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  'CL': {
    name: "Chile",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Saturday", date: "easter-1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Navy Day", date: "05-21", type: "fixed" },
      { name: "Saint Peter and Saint Paul", date: "last-monday-june", type: "calculated" },
      { name: "Our Lady of Mount Carmel", date: "07-16", type: "fixed" },
      { name: "Assumption Day", date: "08-15", type: "fixed" },
      { name: "Independence Day", date: "09-18", type: "fixed" },
      { name: "Army Day", date: "09-19", type: "fixed" },
      { name: "Discovery of Two Worlds", date: "second-monday-october", type: "calculated" },
      { name: "Day of Evangelical Churches", date: "last-monday-october", type: "calculated" },
      { name: "All Saints' Day", date: "11-01", type: "fixed" },
      { name: "Immaculate Conception", date: "12-08", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  
  // D - Countries
  'DE': {
    name: "Germany",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Ascension Day", date: "easter+39", type: "calculated" },
      { name: "Whit Sunday", date: "easter+49", type: "calculated" },
      { name: "Whit Monday", date: "easter+50", type: "calculated" },
      { name: "German Unity Day", date: "10-03", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  'DK': {
    name: "Denmark",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Ascension Day", date: "easter+39", type: "calculated" },
      { name: "Whit Sunday", date: "easter+49", type: "calculated" },
      { name: "Whit Monday", date: "easter+50", type: "calculated" },
      { name: "Constitution Day", date: "06-05", type: "fixed" },
      { name: "Christmas Eve", date: "12-24", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" },
      { name: "New Year's Eve", date: "12-31", type: "fixed" }
    ]
  },
  'DM': {
    name: "Dominica",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Whit Monday", date: "easter+50", type: "calculated" },
      { name: "Emancipation Day", date: "08-01", type: "fixed" },
      { name: "Independence Day", date: "11-03", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  
  // E - Countries
  'EE': {
    name: "Estonia",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Independence Day", date: "02-24", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Spring Day", date: "05-01", type: "fixed" },
      { name: "Victory Day", date: "06-23", type: "fixed" },
      { name: "Midsummer Day", date: "06-24", type: "fixed" },
      { name: "Day of Restoration of Independence", date: "08-20", type: "fixed" },
      { name: "Christmas Eve", date: "12-24", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  'EG': {
    name: "Egypt",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Coptic Christmas Day", date: "01-07", type: "fixed" },
      { name: "Revolution Day", date: "01-25", type: "fixed" },
      { name: "Spring Festival", date: "spring-festival", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Revolution Day", date: "07-23", type: "fixed" },
      { name: "Armed Forces Day", date: "10-06", type: "fixed" },
      { name: "Sinai Liberation Day", date: "10-25", type: "fixed" }
    ]
  },
  'ES': {
    name: "Spain",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Epiphany", date: "01-06", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Assumption Day", date: "08-15", type: "fixed" },
      { name: "Hispanic Day", date: "10-12", type: "fixed" },
      { name: "All Saints' Day", date: "11-01", type: "fixed" },
      { name: "Constitution Day", date: "12-06", type: "fixed" },
      { name: "Immaculate Conception", date: "12-08", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  
  // F - Countries
  'FI': {
    name: "Finland",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Epiphany", date: "01-06", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "May Day", date: "05-01", type: "fixed" },
      { name: "Ascension Day", date: "easter+39", type: "calculated" },
      { name: "Whit Sunday", date: "easter+49", type: "calculated" },
      { name: "Midsummer Eve", date: "friday-after-06-19", type: "calculated" },
      { name: "Independence Day", date: "12-06", type: "fixed" },
      { name: "Christmas Eve", date: "12-24", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  'FJ': {
    name: "Fiji",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Constitution Day", date: "07-10", type: "fixed" },
      { name: "Fiji Day", date: "10-10", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  'FR': {
    name: "France",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Victory in Europe Day", date: "05-08", type: "fixed" },
      { name: "Ascension Day", date: "easter+39", type: "calculated" },
      { name: "Whit Monday", date: "easter+50", type: "calculated" },
      { name: "Bastille Day", date: "07-14", type: "fixed" },
      { name: "Assumption Day", date: "08-15", type: "fixed" },
      { name: "All Saints' Day", date: "11-01", type: "fixed" },
      { name: "Armistice Day", date: "11-11", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  
  // G - Countries
  'GB': {
    name: "United Kingdom",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Early May Bank Holiday", date: "first-monday-may", type: "calculated" },
      { name: "Spring Bank Holiday", date: "last-monday-may", type: "calculated" },
      { name: "Summer Bank Holiday", date: "last-monday-august", type: "calculated" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  'GE': {
    name: "Georgia",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "New Year's Day", date: "01-02", type: "fixed" },
      { name: "Orthodox Christmas Day", date: "01-07", type: "fixed" },
      { name: "Mother's Day", date: "03-03", type: "fixed" },
      { name: "International Women's Day", date: "03-08", type: "fixed" },
      { name: "Good Friday", date: "orthodox-good-friday", type: "calculated" },
      { name: "Great Saturday", date: "orthodox-great-saturday", type: "calculated" },
      { name: "Orthodox Easter", date: "orthodox-easter", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Victory Day", date: "05-09", type: "fixed" },
      { name: "St. Andrew's Day", date: "05-12", type: "fixed" },
      { name: "Independence Day", date: "05-26", type: "fixed" },
      { name: "St. Mary's Day", date: "08-28", type: "fixed" },
      { name: "Day of Svetitskhoveli", date: "10-14", type: "fixed" }
    ]
  },
  'GH': {
    name: "Ghana",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Constitution Day", date: "01-07", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Africa Day", date: "05-25", type: "fixed" },
      { name: "Republic Day", date: "07-01", type: "fixed" },
      { name: "Independence Day", date: "03-06", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  
  // H - Countries
  'HR': {
    name: "Croatia",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "New Year's Day", date: "01-02", type: "fixed" },
      { name: "Epiphany", date: "01-06", type: "fixed" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Statehood Day", date: "05-30", type: "fixed" },
      { name: "Corpus Christi", date: "easter+60", type: "calculated" },
      { name: "Anti-Fascist Struggle Day", date: "06-22", type: "fixed" },
      { name: "Victory and Homeland Thanksgiving Day", date: "08-05", type: "fixed" },
      { name: "Assumption Day", date: "08-15", type: "fixed" },
      { name: "Independence Day", date: "10-08", type: "fixed" },
      { name: "All Saints' Day", date: "11-01", type: "fixed" },
      { name: "Remembrance Day", date: "11-18", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "St. Stephen's Day", date: "12-26", type: "fixed" }
    ]
  },
  'HU': {
    name: "Hungary",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "National Day", date: "03-15", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Whit Sunday", date: "easter+49", type: "calculated" },
      { name: "Whit Monday", date: "easter+50", type: "calculated" },
      { name: "State Foundation Day", date: "08-20", type: "fixed" },
      { name: "National Day", date: "10-23", type: "fixed" },
      { name: "All Saints' Day", date: "11-01", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Second Day of Christmas", date: "12-26", type: "fixed" }
    ]
  },
  
  // I - Countries
  'ID': {
    name: "Indonesia",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Chinese New Year", date: "chinese-new-year", type: "calculated" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Ascension Day of Jesus Christ", date: "easter+39", type: "calculated" },
      { name: "Vesak Day", date: "vesak-day", type: "calculated" },
      { name: "Pancasila Day", date: "06-01", type: "fixed" },
      { name: "Independence Day", date: "08-17", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  'IE': {
    name: "Ireland",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "St. Patrick's Day", date: "03-17", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "May Day", date: "05-01", type: "fixed" },
      { name: "June Bank Holiday", date: "first-monday-june", type: "calculated" },
      { name: "August Bank Holiday", date: "first-monday-august", type: "calculated" },
      { name: "October Bank Holiday", date: "last-monday-october", type: "calculated" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "St. Stephen's Day", date: "12-26", type: "fixed" }
    ]
  },
  'IL': {
    name: "Israel",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Yom HaShoah", date: "april-27-or-28", type: "calculated" },
      { name: "Yom HaZikaron", date: "may-4-or-5", type: "calculated" },
      { name: "Independence Day", date: "may-5-or-6", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Yom Yerushalayim", date: "28th-of-iyar", type: "calculated" },
      { name: "Shavuot", date: "shavuot", type: "calculated" },
      { name: "Rosh Hashanah", date: "rosh-hashanah", type: "calculated" },
      { name: "Yom Kippur", date: "yom-kippur", type: "calculated" },
      { name: "Sukkot", date: "sukkot", type: "calculated" },
      { name: "Simchat Torah", date: "shemini-atzeret", type: "calculated" }
    ]
  },
  'IN': {
    name: "India",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Republic Day", date: "01-26", type: "fixed" },
      { name: "Independence Day", date: "08-15", type: "fixed" },
      { name: "Gandhi Jayanti", date: "10-02", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  'IQ': {
    name: "Iraq",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Victory Day", date: "05-08", type: "fixed" },
      { name: "Revolution Day", date: "07-14", type: "fixed" },
      { name: "Republic Day", date: "07-14", type: "fixed" },
      { name: "Kerbala Day", date: "kerbala", type: "calculated" },
      { name: "Eid al-Fitr", date: "eid-al-fitr", type: "calculated" },
      { name: "Eid al-Adha", date: "eid-al-adha", type: "calculated" }
    ]
  },
  'IR': {
    name: "Iran",
    holidays: [
      { name: "Nowruz", date: "03-21", type: "fixed" },
      { name: "Nowruz Holiday", date: "03-22", type: "fixed" },
      { name: "Oil Nationalization Day", date: "03-29", type: "fixed" },
      { name: "Nowruz Holiday", date: "04-01", type: "fixed" },
      { name: "Martyrdom of Imam Reza", date: "safar-20", type: "calculated" },
      { name: "Death of Khomeini", date: "khordad-14", type: "calculated" },
      { name: "Revolution Day", date: "bahman-11", type: "calculated" },
      { name: "Martyrdom of Fatima", date: "esfand-20", type: "calculated" }
    ]
  },
  'IS': {
    name: "Iceland",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "First Day of Summer", date: "first-thursday-after-04-18", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Ascension Day", date: "easter+39", type: "calculated" },
      { name: "Whit Sunday", date: "easter+49", type: "calculated" },
      { name: "Commerce Day", date: "first-monday-august", type: "calculated" },
      { name: "Christmas Eve", date: "12-24", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" },
      { name: "New Year's Eve", date: "12-31", type: "fixed" }
    ]
  },
  'IT': {
    name: "Italy",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Epiphany", date: "01-06", type: "fixed" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Liberation Day", date: "04-25", type: "fixed" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Republic Day", date: "06-02", type: "fixed" },
      { name: "Assumption Day", date: "08-15", type: "fixed" },
      { name: "All Saints' Day", date: "11-01", type: "fixed" },
      { name: "Immaculate Conception", date: "12-08", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "St. Stephen's Day", date: "12-26", type: "fixed" }
    ]
  },
  
  // J - Countries
  'JM': {
    name: "Jamaica",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Emancipation Day", date: "08-01", type: "fixed" },
      { name: "Independence Day", date: "08-06", type: "fixed" },
      { name: "National Heroes Day", date: "third-monday-october", type: "calculated" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  'JO': {
    name: "Jordan",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Eid al-Fitr", date: "eid-al-fitr", type: "calculated" },
      { name: "Independence Day", date: "05-25", type: "fixed" },
      { name: "Eid al-Adha", date: "eid-al-adha", type: "calculated" },
      { name: "Islamic New Year", date: "islamic-new-year", type: "calculated" },
      { name: "Prophet's Birthday", date: "prophet-birthday", type: "calculated" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  'JP': {
    name: "Japan",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Coming of Age Day", date: "second-monday-january", type: "calculated" },
      { name: "National Foundation Day", date: "02-11", type: "fixed" },
      { name: "Vernal Equinox Day", date: "march-equinox", type: "calculated" },
      { name: "Showa Day", date: "04-29", type: "fixed" },
      { name: "Constitution Memorial Day", date: "05-03", type: "fixed" },
      { name: "Greenery Day", date: "05-04", type: "fixed" },
      { name: "Children's Day", date: "05-05", type: "fixed" },
      { name: "Marine Day", date: "third-monday-july", type: "calculated" },
      { name: "Mountain Day", date: "08-11", type: "fixed" },
      { name: "Respect for the Aged Day", date: "third-monday-september", type: "calculated" },
      { name: "Autumnal Equinox Day", date: "september-equinox", type: "calculated" },
      { name: "Health and Sports Day", date: "second-monday-october", type: "calculated" },
      { name: "Culture Day", date: "11-03", type: "fixed" },
      { name: "Labour Thanksgiving Day", date: "11-23", type: "fixed" },
      { name: "Emperor's Birthday", date: "12-23", type: "fixed" }
    ]
  },
  
  // K - Countries
  'KE': {
    name: "Kenya",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Madaraka Day", date: "06-01", type: "fixed" },
      { name: "Moi Day", date: "10-10", type: "fixed" },
      { name: "Jamhuri Day", date: "12-12", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  'KG': {
    name: "Kyrgyzstan",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "New Year's Day", date: "01-02", type: "fixed" },
      { name: "Orthodox Christmas Day", date: "01-07", type: "fixed" },
      { name: "Defender of the Fatherland Day", date: "02-23", type: "fixed" },
      { name: "International Women's Day", date: "03-08", type: "fixed" },
      { name: "Nooruz", date: "03-21", type: "fixed" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Victory Day", date: "05-09", type: "fixed" },
      { name: "Constitution Day", date: "05-05", type: "fixed" },
      { name: "Independence Day", date: "08-31", type: "fixed" },
      { name: "Days of History and Commemoration of Ancestors", date: "11-07", type: "fixed" },
      { name: "New Year's Eve", date: "12-31", type: "fixed" }
    ]
  },
  'KH': {
    name: "Cambodia",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Independence Day", date: "11-09", type: "fixed" },
      { name: "King's Birthday", date: "11-09", type: "fixed" },
      { name: "Meak Bochea Day", date: "meak-bochea", type: "calculated" },
      { name: "Khmer New Year", date: "april-13-15", type: "calculated" },
      { name: "Visak Bochea Day", date: "visak-bochea", type: "calculated" },
      { name: "Royal Ploughing Ceremony", date: "may-10-or-14", type: "calculated" },
      { name: "Water Festival (Bon Om Touk)", date: "november-full-moon", type: "calculated" }
    ]
  },
  'KR': {
    name: "South Korea",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Seollal", date: "korean-new-year", type: "calculated" },
      { name: "Independence Movement Day", date: "03-01", type: "fixed" },
      { name: "Buddha's Birthday", date: "buddhas-birthday", type: "calculated" },
      { name: "Children's Day", date: "05-05", type: "fixed" },
      { name: "Memorial Day", date: "06-06", type: "fixed" },
      { name: "Constitution Day", date: "07-17", type: "fixed" },
      { name: "Liberation Day", date: "08-15", type: "fixed" },
      { name: "Chuseok", date: "korean-thanksgiving", type: "calculated" },
      { name: "National Foundation Day", date: "10-03", type: "fixed" },
      { name: "Hangeul Day", date: "10-09", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  
  // L - Countries
  'LB': {
    name: "Lebanon",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Martyrs' Day", date: "05-25", type: "fixed" },
      { name: "Independence Day", date: "11-22", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  'LK': {
    name: "Sri Lanka",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "National Day", date: "02-04", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Vesak Full Moon Day", date: "vesak-full-moon", type: "calculated" },
      { name: "Independence Day", date: "02-04", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  'LT': {
    name: "Lithuania",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "State Day of Lithuania", date: "03-11", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "St. John's Day", date: "06-24", type: "fixed" },
      { name: "Statehood Day", date: "07-06", type: "fixed" },
      { name: "Assumption Day", date: "08-15", type: "fixed" },
      { name: "All Saints' Day", date: "11-01", type: "fixed" },
      { name: "Christmas Eve", date: "12-24", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Second Day of Christmas", date: "12-26", type: "fixed" }
    ]
  },
  'LU': {
    name: "Luxembourg",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Ascension Day", date: "easter+39", type: "calculated" },
      { name: "Whit Monday", date: "easter+50", type: "calculated" },
      { name: "National Day", date: "06-23", type: "fixed" },
      { name: "Assumption Day", date: "08-15", type: "fixed" },
      { name: "All Saints' Day", date: "11-01", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  'LV': {
    name: "Latvia",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Independence Day", date: "05-04", type: "fixed" },
      { name: "Midsummer Day", date: "06-23", type: "fixed" },
      { name: "Midsummer Day", date: "06-24", type: "fixed" },
      { name: "Proclamation Day", date: "11-18", type: "fixed" },
      { name: "Christmas Eve", date: "12-24", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" },
      { name: "New Year's Eve", date: "12-31", type: "fixed" }
    ]
  },
  
  // M - Countries
  'MA': {
    name: "Morocco",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Independence Manifesto Day", date: "01-11", type: "fixed" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Throne Day", date: "07-30", type: "fixed" },
      { name: "Oued Ed-Dahab Day", date: "08-14", type: "fixed" },
      { name: "Revolution of the King and the People Day", date: "08-20", type: "fixed" },
      { name: "Youth Day", date: "08-21", type: "fixed" },
      { name: "Green March Day", date: "11-06", type: "fixed" },
      { name: "Independence Day", date: "11-18", type: "fixed" }
    ]
  },
  'MC': {
    name: "Monaco",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Ascension Day", date: "easter+39", type: "calculated" },
      { name: "Whit Monday", date: "easter+50", type: "calculated" },
      { name: "National Day", date: "11-19", type: "fixed" },
      { name: "Assumption Day", date: "08-15", type: "fixed" },
      { name: "All Saints' Day", date: "11-01", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Saint Stephen's Day", date: "12-26", type: "fixed" }
    ]
  },
  'ME': {
    name: "Montenegro",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "New Year's Day", date: "01-02", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Labour Day", date: "05-02", type: "fixed" },
      { name: "Good Friday", date: "orthodox-good-friday", type: "calculated" },
      { name: "Orthodox Easter", date: "orthodox-easter", type: "calculated" },
      { name: "Statehood Day", date: "07-13", type: "fixed" },
      { name: "Independence Day", date: "05-21", type: "fixed" },
      { name: "Victory Day", date: "05-09", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  'MG': {
    name: "Madagascar",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Women's Day", date: "02-26", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Ascension Day", date: "easter+39", type: "calculated" },
      { name: "Independence Day", date: "06-26", type: "fixed" },
      { name: "Assumption Day", date: "08-15", type: "fixed" },
      { name: "All Saints' Day", date: "11-01", type: "fixed" },
      { name: "Republic Day", date: "12-11", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  'MK': {
    name: "North Macedonia",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "New Year's Day", date: "01-02", type: "fixed" },
      { name: "Good Friday", date: "orthodox-good-friday", type: "calculated" },
      { name: "Orthodox Easter", date: "orthodox-easter", type: "calculated" },
      { name: "Orthodox Easter Monday", date: "orthodox-easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Labour Day", date: "05-02", type: "fixed" },
      { name: "Saint Clement of Ohrid Day", date: "07-02", type: "fixed" },
      { name: "Independence Day", date: "09-08", type: "fixed" },
      { name: "Revolution Day", date: "10-11", type: "fixed" },
      { name: "Day of Macedonian Uprising", date: "10-23", type: "fixed" },
      { name: "Christmas Day", date: "01-07", type: "fixed" }
    ]
  },
  'ML': {
    name: "Mali",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "International Women's Day", date: "03-08", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Africa Day", date: "05-25", type: "fixed" },
      { name: "Independence Day", date: "09-22", type: "fixed" },
      { name: "Prophet's Birthday", date: "prophet-birthday", type: "calculated" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  'MM': {
    name: "Myanmar",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Independence Day", date: "01-04", type: "fixed" },
      { name: "Union Day", date: "02-12", type: "fixed" },
      { name: "Peasant's Day", date: "03-02", type: "fixed" },
      { name: "Full Moon Day of Tabodwe", date: "tabodwe-full-moon", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Full Moon Day of Kasone", date: "kasone-full-moon", type: "calculated" },
      { name: "Martyrs' Day", date: "07-19", type: "fixed" },
      { name: "Full Moon Day of Waso", date: "waso-full-moon", type: "calculated" },
      { name: "World War II Veterans Day", date: "12-27", type: "fixed" }
    ]
  },
  'MN': {
    name: "Mongolia",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "New Year's Day", date: "01-02", type: "fixed" },
      { name: "Women's Day", date: "03-08", type: "fixed" },
      { name: "Naadam Holiday", date: "07-11", type: "fixed" },
      { name: "Naadam Holiday", date: "07-12", type: "fixed" },
      { name: "Naadam Holiday", date: "07-13", type: "fixed" },
      { name: "Republic Day", date: "11-26", type: "fixed" },
      { name: "New Year's Eve", date: "12-31", type: "fixed" }
    ]
  },
  'MT': {
    name: "Malta",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Feast of St. Paul's Shipwreck", date: "02-10", type: "fixed" },
      { name: "Feast of St. Joseph", date: "03-19", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Feast of St. Peter and St. Paul", date: "06-29", type: "fixed" },
      { name: "Assumption Day", date: "08-15", type: "fixed" },
      { name: "Feast of Our Lady of Victories", date: "09-08", type: "fixed" },
      { name: "Independence Day", date: "09-21", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  'MU': {
    name: "Mauritius",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Chinese Spring Festival", date: "chinese-new-year", type: "calculated" },
      { name: "Shiv Churni", date: "march-04", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Arrival of Indentured Labourers", date: "05-02", type: "fixed" },
      { name: "Abolition of Slavery", date: "02-01", type: "fixed" },
      { name: "Independence Day", date: "03-12", type: "fixed" },
      { name: "Diwali", date: "diwali", type: "calculated" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  
  // N - Countries
  'MX': {
    name: "Mexico",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Constitution Day", date: "first-monday-february", type: "calculated" },
      { name: "Benito Juárez's Birthday", date: "third-monday-march", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Independence Day", date: "09-16", type: "fixed" },
      { name: "Revolution Day", date: "third-monday-november", type: "calculated" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  'MY': {
    name: "Malaysia",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Chinese New Year", date: "chinese-new-year", type: "calculated" },
      { name: "Chinese New Year", date: "chinese-new-year+1", type: "calculated" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Wesak Day", date: "vesak-day", type: "calculated" },
      { name: "National Day", date: "08-31", type: "fixed" },
      { name: "Malaysia Day", date: "09-16", type: "fixed" },
      { name: "Deepavali", date: "deepavali", type: "calculated" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  'NG': {
    name: "Nigeria",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Worker's Day", date: "05-01", type: "fixed" },
      { name: "Democracy Day", date: "05-29", type: "fixed" },
      { name: "Independence Day", date: "10-01", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  'NI': {
    name: "Nicaragua",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Army Day", date: "05-27", type: "fixed" },
      { name: "Independence Day", date: "09-15", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  'NL': {
    name: "Netherlands",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "King's Day", date: "04-27", type: "fixed" },
      { name: "Liberation Day", date: "05-05", type: "fixed" },
      { name: "Ascension Day", date: "easter+39", type: "calculated" },
      { name: "Whit Sunday", date: "easter+49", type: "calculated" },
      { name: "Whit Monday", date: "easter+50", type: "calculated" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  'NO': {
    name: "Norway",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Constitution Day", date: "05-17", type: "fixed" },
      { name: "Ascension Day", date: "easter+39", type: "calculated" },
      { name: "Whit Sunday", date: "easter+49", type: "calculated" },
      { name: "Whit Monday", date: "easter+50", type: "calculated" },
      { name: "Christmas Eve", date: "12-24", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" },
      { name: "New Year's Eve", date: "12-31", type: "fixed" }
    ]
  },
  'NP': {
    name: "Nepal",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "National Democracy Day", date: "02-19", type: "fixed" },
      { name: "Martyrs' Day", date: "04-08", type: "fixed" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Constitution Day", date: "09-20", type: "fixed" },
      { name: "Dashain", date: "dashain", type: "calculated" },
      { name: "Tihar", date: "tihar", type: "calculated" },
      { name: "Laxmi Puja", date: "laxmi-puja", type: "calculated" },
      { name: "Gai Jatra", date: "gai-jatra", type: "calculated" }
    ]
  },
  'NZ': {
    name: "New Zealand",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Day after New Year's Day", date: "01-02", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "ANZAC Day", date: "04-25", type: "fixed" },
      { name: "Queen's Birthday", date: "first-monday-june", type: "calculated" },
      { name: "Labour Day", date: "fourth-monday-october", type: "calculated" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  
  // O - Countries
  'OM': {
    name: "Oman",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Birthday of Sultan Qaboos", date: "11-18", type: "fixed" },
      { name: "National Day", date: "11-18", type: "fixed" }
    ]
  },
  
  // P - Countries
  'PA': {
    name: "Panama",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Martyrs' Day", date: "01-09", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Independence Day", date: "11-03", type: "fixed" },
      { name: "Separation Day", date: "11-04", type: "fixed" },
      { name: "President's Day", date: "11-05", type: "fixed" },
      { name: "Independence from Spain", date: "11-28", type: "fixed" },
      { name: "Mothers' Day", date: "12-08", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  'PE': {
    name: "Peru",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Holy Thursday", date: "easter-3", type: "calculated" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Battle of Arica", date: "06-07", type: "fixed" },
      { name: "Independence Day", date: "07-28", type: "fixed" },
      { name: "Independence Day", date: "07-29", type: "fixed" },
      { name: "Santa Rosa de Lima", date: "08-30", type: "fixed" },
      { name: "Battle of Angamos", date: "10-08", type: "fixed" },
      { name: "All Saints' Day", date: "11-01", type: "fixed" },
      { name: "Immaculate Conception", date: "12-08", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  'PG': {
    name: "Papua New Guinea",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Queen's Birthday", date: "second-saturday-june", type: "calculated" },
      { name: "Remembrance Day", date: "07-23", type: "fixed" },
      { name: "Independence Day", date: "09-16", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  'PH': {
    name: "Philippines",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Maundy Thursday", date: "easter-3", type: "calculated" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Independence Day", date: "06-12", type: "fixed" },
      { name: "Bonifacio Day", date: "11-30", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Rizal Day", date: "12-30", type: "fixed" }
    ]
  },
  'PK': {
    name: "Pakistan",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Kashmir Day", date: "02-05", type: "fixed" },
      { name: "Pakistan Day", date: "03-23", type: "fixed" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Independence Day", date: "08-14", type: "fixed" },
      { name: "Iqbal Day", date: "11-09", type: "fixed" },
      { name: "Quaid-e-Azam Day", date: "12-25", type: "fixed" },
      { name: "Eid ul-Fitr", date: "eid-ul-fitr", type: "calculated" },
      { name: "Eid ul-Adha", date: "eid-ul-adha", type: "calculated" }
    ]
  },
  'PL': {
    name: "Poland",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Epiphany", date: "01-06", type: "fixed" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Constitution Day", date: "05-03", type: "fixed" },
      { name: "Corpus Christi", date: "easter+60", type: "calculated" },
      { name: "Assumption Day", date: "08-15", type: "fixed" },
      { name: "All Saints' Day", date: "11-01", type: "fixed" },
      { name: "Independence Day", date: "11-11", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  'PT': {
    name: "Portugal",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Freedom Day", date: "04-25", type: "fixed" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Portugal Day", date: "06-10", type: "fixed" },
      { name: "Assumption Day", date: "08-15", type: "fixed" },
      { name: "Republic Day", date: "10-05", type: "fixed" },
      { name: "All Saints' Day", date: "11-01", type: "fixed" },
      { name: "Restoration of Independence", date: "12-01", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  'PY': {
    name: "Paraguay",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Independence Day", date: "05-15", type: "fixed" },
      { name: "Chaco Armistice", date: "06-12", type: "fixed" },
      { name: "Founding of Asunción", date: "08-15", type: "fixed" },
      { name: "Boquerón Battle", date: "09-29", type: "fixed" },
      { name: "Virgin of Caacupé", date: "12-08", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  
  // Q - Countries
  'QA': {
    name: "Qatar",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Eid al-Fitr", date: "eid-al-fitr", type: "calculated" },
      { name: "Eid al-Adha", date: "eid-al-adha", type: "calculated" },
      { name: "Islamic New Year", date: "islamic-new-year", type: "calculated" },
      { name: "Prophet's Birthday", date: "prophet-birthday", type: "calculated" },
      { name: "National Day", date: "12-18", type: "fixed" }
    ]
  },
  
  // R - Countries
  'RO': {
    name: "Romania",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "New Year's Day", date: "01-02", type: "fixed" },
      { name: "Unification Day", date: "01-24", type: "fixed" },
      { name: "Good Friday", date: "orthodox-good-friday", type: "calculated" },
      { name: "Easter Sunday", date: "orthodox-easter", type: "calculated" },
      { name: "Easter Monday", date: "orthodox-easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Pentecost", date: "orthodox-easter+49", type: "calculated" },
      { name: "Whit Monday", date: "orthodox-easter+50", type: "calculated" },
      { name: "Children's Day", date: "06-01", type: "fixed" },
      { name: "St. Andrew's Day", date: "11-30", type: "fixed" },
      { name: "National Day", date: "12-01", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  'RS': {
    name: "Serbia",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "New Year's Day", date: "01-02", type: "fixed" },
      { name: "Good Friday", date: "orthodox-good-friday", type: "calculated" },
      { name: "Orthodox Easter", date: "orthodox-easter", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Labour Day", date: "05-02", type: "fixed" },
      { name: "Armistice Day", date: "11-11", type: "fixed" },
      { name: "Statehood Day", date: "02-15", type: "fixed" },
      { name: "Independence Day", date: "06-28", type: "fixed" }
    ]
  },
  'RU': {
    name: "Russia",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "New Year's Day", date: "01-02", type: "fixed" },
      { name: "Orthodox Christmas Day", date: "01-07", type: "fixed" },
      { name: "Defender of the Fatherland Day", date: "02-23", type: "fixed" },
      { name: "International Women's Day", date: "03-08", type: "fixed" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Victory Day", date: "05-09", type: "fixed" },
      { name: "Russia Day", date: "06-12", type: "fixed" },
      { name: "Unity Day", date: "11-04", type: "fixed" }
    ]
  },
  'RW': {
    name: "Rwanda",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Independence Day", date: "07-01", type: "fixed" },
      { name: "Liberation Day", date: "07-04", type: "fixed" },
      { name: "Genocide Memorial Day", date: "04-07", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  
  // S - Countries
  'SA': {
    name: "Saudi Arabia",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Eid al-Fitr", date: "eid-al-fitr", type: "calculated" },
      { name: "Eid al-Adha", date: "eid-al-adha", type: "calculated" },
      { name: "Islamic New Year", date: "islamic-new-year", type: "calculated" },
      { name: "Prophet's Birthday", date: "prophet-birthday", type: "calculated" },
      { name: "National Day", date: "09-23", type: "fixed" }
    ]
  },
  'SE': {
    name: "Sweden",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Epiphany", date: "01-06", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "May Day", date: "05-01", type: "fixed" },
      { name: "Ascension Day", date: "easter+39", type: "calculated" },
      { name: "Whit Sunday", date: "easter+49", type: "calculated" },
      { name: "National Day", date: "06-06", type: "fixed" },
      { name: "Midsummer Eve", date: "friday-after-06-19", type: "calculated" },
      { name: "Midsummer Day", date: "saturday-after-06-19", type: "calculated" },
      { name: "All Saints' Day", date: "saturday-before-10-31", type: "calculated" },
      { name: "Christmas Eve", date: "12-24", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" },
      { name: "New Year's Eve", date: "12-31", type: "fixed" }
    ]
  },
  'SG': {
    name: "Singapore",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Chinese New Year", date: "chinese-new-year", type: "calculated" },
      { name: "Chinese New Year", date: "chinese-new-year+1", type: "calculated" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Vesak Day", date: "vesak-day", type: "calculated" },
      { name: "National Day", date: "08-09", type: "fixed" },
      { name: "Deepavali", date: "deepavali", type: "calculated" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  'SI': {
    name: "Slovenia",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "New Year's Day", date: "01-02", type: "fixed" },
      { name: "Preseren Day", date: "02-08", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Sunday", date: "easter", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Labour Day", date: "05-02", type: "fixed" },
      { name: "Statehood Day", date: "06-25", type: "fixed" },
      { name: "Assumption Day", date: "08-15", type: "fixed" },
      { name: "Reformation Day", date: "10-31", type: "fixed" },
      { name: "Remembrance Day", date: "11-01", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Independence and Unity Day", date: "12-26", type: "fixed" }
    ]
  },
  'SK': {
    name: "Slovakia",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Epiphany", date: "01-06", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Liberation Day", date: "05-08", type: "fixed" },
      { name: "St. Cyril and Methodius Day", date: "07-05", type: "fixed" },
      { name: "Slovak National Uprising", date: "08-29", type: "fixed" },
      { name: "Constitution Day", date: "09-01", type: "fixed" },
      { name: "Our Lady of the Seven Sorrows", date: "09-15", type: "fixed" },
      { name: "All Saints' Day", date: "11-01", type: "fixed" },
      { name: "Freedom and Democracy Day", date: "11-17", type: "fixed" },
      { name: "Christmas Eve", date: "12-24", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "St. Stephen's Day", date: "12-26", type: "fixed" }
    ]
  },
  'SN': {
    name: "Senegal",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Africa Day", date: "05-25", type: "fixed" },
      { name: "Independence Day", date: "04-04", type: "fixed" },
      { name: "Tabaski", date: "tabaski", type: "calculated" },
      { name: "Prophet's Birthday", date: "prophet-birthday", type: "calculated" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  'TH': {
    name: "Thailand",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Makha Bucha Day", date: "makhapuja", type: "calculated" },
      { name: "Chakri Day", date: "04-06", type: "fixed" },
      { name: "Songkran", date: "04-13", type: "fixed" },
      { name: "Songkran", date: "04-14", type: "fixed" },
      { name: "Songkran", date: "04-15", type: "fixed" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Coronation Day", date: "05-04", type: "fixed" },
      { name: "Wisakha Bucha Day", date: "visakhapuja", type: "calculated" },
      { name: "Asalha Bucha Day", date: "asalhapuja", type: "calculated" },
      { name: "Mother's Day", date: "08-12", type: "fixed" },
      { name: "King's Birthday", date: "12-05", type: "fixed" },
      { name: "Constitution Day", date: "12-10", type: "fixed" },
      { name: "Father's Day", date: "12-28", type: "fixed" }
    ]
  },
  'TN': {
    name: "Tunisia",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Independence Day", date: "03-20", type: "fixed" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Victory Day", date: "06-01", type: "fixed" },
      { name: "Martyrs' Day", date: "04-09", type: "fixed" },
      { name: "Eid al-Fitr", date: "eid-al-fitr", type: "calculated" },
      { name: "Eid al-Adha", date: "eid-al-adha", type: "calculated" },
      { name: "Islamic New Year", date: "islamic-new-year", type: "calculated" },
      { name: "Prophet's Birthday", date: "prophet-birthday", type: "calculated" },
      { name: "Women's Day", date: "08-13", type: "fixed" },
      { name: "Republic Day", date: "10-15", type: "fixed" }
    ]
  },
  'TR': {
    name: "Turkey",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "National Sovereignty Day", date: "04-23", type: "fixed" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Atatürk Commemoration & Youth Day", date: "05-19", type: "fixed" },
      { name: "Victory Day", date: "08-30", type: "fixed" },
      { name: "Republic Day", date: "10-29", type: "fixed" },
      { name: "Eid al-Fitr", date: "eid-al-fitr", type: "calculated" },
      { name: "Eid al-Fitr", date: "eid-al-fitr+1", type: "calculated" },
      { name: "Eid al-Adha", date: "eid-al-adha", type: "calculated" },
      { name: "Eid al-Adha", date: "eid-al-adha+1", type: "calculated" }
    ]
  },
  'TZ': {
    name: "Tanzania",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Africa Day", date: "05-25", type: "fixed" },
      { name: "Saba Saba", date: "07-07", type: "fixed" },
      { name: "Farmers' Day", date: "08-08", type: "fixed" },
      { name: "Independence Day", date: "12-09", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  
  // U - Countries
  'UA': {
    name: "Ukraine",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Orthodox Christmas Day", date: "01-07", type: "fixed" },
      { name: "Good Friday", date: "orthodox-good-friday", type: "calculated" },
      { name: "Orthodox Easter", date: "orthodox-easter", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Labour Day", date: "05-02", type: "fixed" },
      { name: "Victory Day", date: "05-09", type: "fixed" },
      { name: "Constitution Day", date: "06-28", type: "fixed" },
      { name: "Independence Day", date: "08-24", type: "fixed" },
      { name: "Defender of Ukraine Day", date: "10-14", type: "fixed" },
      { name: "Catholic Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  'UG': {
    name: "Uganda",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Martyrs' Day", date: "06-03", type: "fixed" },
      { name: "Independence Day", date: "10-09", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  },
  'US': {
    name: "United States",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Martin Luther King Jr. Day", date: "third-monday-january", type: "calculated" },
      { name: "Presidents' Day", date: "third-monday-february", type: "calculated" },
      { name: "Memorial Day", date: "last-monday-may", type: "calculated" },
      { name: "Independence Day", date: "07-04", type: "fixed" },
      { name: "Labour Day", date: "first-monday-september", type: "calculated" },
      { name: "Columbus Day", date: "second-monday-october", type: "calculated" },
      { name: "Veterans Day", date: "11-11", type: "fixed" },
      { name: "Thanksgiving", date: "fourth-thursday-november", type: "calculated" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  'UY': {
    name: "Uruguay",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Birthday of Artigas", date: "04-19", type: "fixed" },
      { name: "Independence Day", date: "08-25", type: "fixed" },
      { name: "Day of the Race", date: "10-12", type: "fixed" },
      { name: "All Saints' Day", date: "11-01", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  'UZ': {
    name: "Uzbekistan",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Women's Day", date: "03-08", type: "fixed" },
      { name: "Spring Festival", date: "03-21", type: "fixed" },
      { name: "Constitution Day", date: "05-09", type: "fixed" },
      { name: "Independence Day", date: "09-01", type: "fixed" },
      { name: "Teacher's Day", date: "10-01", type: "fixed" },
      { name: "University Day", date: "10-14", type: "fixed" }
    ]
  },
  
  // V - Countries
  'VE': {
    name: "Venezuela",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Independence Day", date: "07-05", type: "fixed" },
      { name: "Battle of Carabobo", date: "06-24", type: "fixed" },
      { name: "Bolívar's Birthday", date: "07-24", type: "fixed" },
      { name: "Columbus Day", date: "10-12", type: "fixed" },
      { name: "All Saints' Day", date: "11-01", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  'VN': {
    name: "Vietnam",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Tet (Lunar New Year)", date: "tet", type: "calculated" },
      { name: "Hung Kings Commemoration Day", date: "march-10th-lunar", type: "calculated" },
      { name: "Reunification Day", date: "04-30", type: "fixed" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "National Day", date: "09-02", type: "fixed" }
    ]
  },
  
  // Z - Countries
  'ZA': {
    name: "South Africa",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Human Rights Day", date: "03-21", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Family Day", date: "easter+1", type: "calculated" },
      { name: "Freedom Day", date: "04-27", type: "fixed" },
      { name: "Workers' Day", date: "05-01", type: "fixed" },
      { name: "Youth Day", date: "06-16", type: "fixed" },
      { name: "National Women's Day", date: "08-09", type: "fixed" },
      { name: "Heritage Day", date: "09-24", type: "fixed" },
      { name: "Day of Reconciliation", date: "12-16", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Day of Goodwill", date: "12-26", type: "fixed" }
    ]
  },
  'ZM': {
    name: "Zambia",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Africa Day", date: "05-25", type: "fixed" },
      { name: "Heroes' Day", date: "first-monday-july", type: "calculated" },
      { name: "Unity Day", date: "07-02", type: "fixed" },
      { name: "Independence Day", date: "10-24", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" }
    ]
  },
  'ZW': {
    name: "Zimbabwe",
    holidays: [
      { name: "New Year's Day", date: "01-01", type: "fixed" },
      { name: "Good Friday", date: "easter-2", type: "calculated" },
      { name: "Easter Monday", date: "easter+1", type: "calculated" },
      { name: "Labour Day", date: "05-01", type: "fixed" },
      { name: "Africa Day", date: "05-25", type: "fixed" },
      { name: "Heroes' Day", date: "second-monday-august", type: "calculated" },
      { name: "Defence Forces Day", date: "third-monday-august", type: "calculated" },
      { name: "Independence Day", date: "10-01", type: "fixed" },
      { name: "Christmas Day", date: "12-25", type: "fixed" },
      { name: "Boxing Day", date: "12-26", type: "fixed" }
    ]
  }
};
