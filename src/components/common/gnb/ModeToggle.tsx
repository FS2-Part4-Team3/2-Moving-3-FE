'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import moon from '@/../public/assets/common/gnb/moon.svg';
import sun from '@/../public/assets/common/gnb/sun.svg';

export function ModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`w-[7.5rem] h-[4rem] rounded-[3rem] gap-[0.5rem] flex items-center transition-all border border-dark-t pl-[0.3rem] dark:pr-[0.3rem] dark:pl-0 dark:justify-end
        ${isDark ? 'bg-dark-bg text-dark-t' : 'bg-gray-100 text-black-400'}
      `}
    >
      <span className={`text-[1rem] font-semibold transition-all ${isDark ? 'block opacity-100' : 'opacity-0 hidden'}`}>
        NIGHT
      </span>
      <div className={`w-[3rem] h-[3rem] bg-white rounded-full flex items-center justify-center transition-transform`}>
        {isDark ? (
          <Image src={moon} alt="dark" width={20} height={20} className="lg:block sm:hidden" />
        ) : (
          <Image src={sun} alt="light" width={20} height={20} className="lg:block sm:hidden" />
        )}
      </div>
      <span className={`text-[1rem] font-bold transition-all ${isDark ? 'opacity-0 hidden' : 'opacity-100 block'}`}>DAY</span>
    </button>
  );
}
