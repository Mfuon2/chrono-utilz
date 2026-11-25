import { Hemisphere } from './Hemisphere';
import { Season } from './Season';
import { readDate } from './readDate';

/**
 * Gets the season for a date
 * @param date - The date
 * @param hemisphere - Northern or southern hemisphere (default: 'northern')
 * @returns Season name
 */
export function getSeason(
  date: Date | string | number,
  hemisphere: Hemisphere = 'northern',
): Season {
  const safeDate = readDate(date);

  const month = safeDate.getMonth() + 1; // 1-12
  const day = safeDate.getDate();

  let season: Season;

  // Northern hemisphere seasons
  if ((month === 3 && day >= 20) || month === 4 || month === 5 || (month === 6 && day < 21)) {
    season = 'Spring';
  } else if (
    (month === 6 && day >= 21) ||
    month === 7 ||
    month === 8 ||
    (month === 9 && day < 22)
  ) {
    season = 'Summer';
  } else if (
    (month === 9 && day >= 22) ||
    month === 10 ||
    month === 11 ||
    (month === 12 && day < 21)
  ) {
    season = 'Autumn';
  } else {
    season = 'Winter';
  }

  // Flip seasons for southern hemisphere
  if (hemisphere === 'southern') {
    const seasonMap: Record<Season, Season> = {
      Spring: 'Autumn',
      Summer: 'Winter',
      Autumn: 'Spring',
      Winter: 'Summer',
    };
    season = seasonMap[season];
  }

  return season;
}
