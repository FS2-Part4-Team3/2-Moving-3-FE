import type { Day } from '@/interfaces/Card/CalendarCardInterface';

export default function AddressFormat(address: string) {
  const match = address.match(/^[^\s]+\s[^\s]+/);
  const result = match ? match[0] : '';
  return result;
}

export function DateFormat(isoDate: string): string {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const date = new Date(isoDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const dayOfWeek = daysOfWeek[date.getDay()];

  // Ex: 2024. 08. 26(월)
  return `${year}. ${month}. ${day}(${dayOfWeek})`;
}

export function DateWithoutDayWeeKFormat(isoString: string) {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // Ex: 2024. 08. 26
  return `${year}.${month}.${day}`;
}

export function DateIncludeTimeFormat(isoString: string) {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dayOfWeek = days[date.getDay()];

  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const period = hours < 12 ? '오전' : '오후';
  const formattedHours = hours % 12 || 12;

  // Ex: 2024. 08. 26(월) 오전 10:00
  return `${year}. ${month}. ${day}(${dayOfWeek}) ${period} ${formattedHours}:${minutes}`;
}

export function DateFormatToYYYYMMDD(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // Ex: 2025-01-01
  return `${year}-${month}-${day}`;
}

export function timeAgoFormat(isoDate: string): string {
  const now = new Date();
  const targetDate = new Date(isoDate);
  const diffMs = now.getTime() - targetDate.getTime();

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays >= 1) {
    return `${diffDays}일 전`;
  } else if (diffHours >= 1) {
    return `${diffHours}시간 전`;
  } else {
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return `${diffMinutes}분 전`;
  }
}

export function priceFormat(price: number) {
  return price.toLocaleString();
}

export function formatDate(date: Date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function getDaysInMonth(date: Date): Day[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);

  const prevDaysCount = startOfMonth.getDay();
  const prevDays: Day[] = Array.from({ length: prevDaysCount }, (_, i) => {
    const prevDate = new Date(year, month, 0 - (prevDaysCount - i - 1));
    return { date: prevDate.getDate(), isCurrentMonth: false };
  }).reverse();

  const currentDays: Day[] = Array.from({ length: endOfMonth.getDate() }, (_, i) => ({
    date: i + 1,
    isCurrentMonth: true,
  }));

  const nextDaysCount = 6 - endOfMonth.getDay();
  const nextDays: Day[] = Array.from({ length: nextDaysCount }, (_, i) => ({
    date: i + 1,
    isCurrentMonth: false,
  }));

  return [...prevDays, ...currentDays, ...nextDays];
}
