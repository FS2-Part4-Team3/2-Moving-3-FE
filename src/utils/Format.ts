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

  return `${year}. ${month}. ${day}(${dayOfWeek})`;
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
