import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

export const transformDuration = (durationInMinutes: number): string => {
  const dur = dayjs.duration(durationInMinutes, 'minutes')
  const hours = dur.hours()
  const minutes = dur.minutes()
  return `${hours > 0 ? `${hours}h` : GLOBAL_VARIABLES.EMPTY_STRING}${
    hours > 0 && minutes > 0
      ? GLOBAL_VARIABLES.SINGLE_SPACE
      : GLOBAL_VARIABLES.EMPTY_STRING
  }${minutes > 0 ? `${minutes}m` : GLOBAL_VARIABLES.EMPTY_STRING}`
}

export const transformDateFormat = (date: number): string => {
  return dayjs(date).format(GLOBAL_VARIABLES.DATES_FORMAT.DATE)
}
export const transformDateTime = (date: string | undefined): string => {
  return dayjs(date).format(GLOBAL_VARIABLES.DATES_FORMAT.DATE_TIME)
}

export const transformDateTimeFormat = (date: number | undefined): string => {
  if (date === undefined) {
    return GLOBAL_VARIABLES.EMPTY_STRING
  }
  return dayjs.unix(date).format(GLOBAL_VARIABLES.DATES_FORMAT.DATE_TIME)
}
export const convertToUnixTimestamp = (date: string): number => {
  return dayjs(date).unix()
}
export const convertFromUnixTimestampToDateTime = (
  timestamp: number,
): string => {
  return dayjs
    .unix(timestamp)
    .format(GLOBAL_VARIABLES.DATES_FORMAT.DATE_TIME_ISO)
}

export const convertFromUnixTimestampToDate = (
  timestamp: number,
): string => {
  return dayjs
    .unix(timestamp)
    .format(GLOBAL_VARIABLES.DATES_FORMAT.DATE)
}
export const convertToISODate = (dateString: string) => {
  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`;
};