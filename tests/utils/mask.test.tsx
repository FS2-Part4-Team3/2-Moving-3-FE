import { maskName } from '@/utils/mask';

describe('maskName Utility Function', () => {
  it('한국어 이름 기본', () => {
    const result = maskName('김재원');
    expect(result).toBe('김*원');
  });

  it('한국어 두 글자 이름', () => {
    const result = maskName('이길');
    expect(result).toBe('이*');
  });

  it('영문 이름 기본', () => {
    const result = maskName('John');
    expect(result).toBe('J**n');
  });

  it('영문 이름 공백 포함', () => {
    const result = maskName('Jane Doe');
    expect(result).toBe('J**e D*e');
  });

  it('1글자 이름', () => {
    const result = maskName('A');
    expect(result).toBe('A');
  });
});
