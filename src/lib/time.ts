import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Tokyo');

// UTC
export const getUtcTime = () => {
  const utcTime = dayjs().utc().format();
  return utcTime;
};

// 時間
export const getTime = () => {
  const time = dayjs().tz().format();
  return time;
};

// 時間 (日本語表記)
export const getTimeJa = () => {
  const time = dayjs().tz().format('YYYY年MM月DD日HH:mm');
  return time;
};

// 日付 (日本語表記)
export const getDateJa = () => {
  const date = dayjs().tz().format('MM月DD日');
  return date;
};

// 時間 -> 日付 (日本語表記)
export const getTimeToDateJa = (time: string) => {
  const date = dayjs(time).tz().format('MM月DD日');
  return date;
};
