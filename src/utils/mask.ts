export function maskName(name: string): string {
  // 이름에 공백이 포함되어 있으면, 공백을 그대로 두고 나머지 부분 각각 마스킹
  if (name.includes(' ')) {
    return name
      .split(' ')
      .map((part: string) => maskName(part))
      .join(' ');
  }

  if (name.length === 2) {
    // 이름이 두 글자일 경우 끝 글자 마스킹
    return `${name[0]}*`;
  }

  if (name.length > 2) {
    // 이름이 세 글자 이상일 경우 가운데 글자들 마스킹
    const firstChar = name[0];
    const lastChar = name[name.length - 1];
    const maskedPart = '*'.repeat(name.length - 2);
    return `${firstChar}${maskedPart}${lastChar}`;
  }

  return name;
}
