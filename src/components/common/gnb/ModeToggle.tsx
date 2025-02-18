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
      className={`lg:w-[7.5rem] lg:h-[4rem] sm:h-[2rem] sm:w-[4rem] rounded-[3rem] gap-[0.5rem] flex items-center transition-all border border-dark-t lg:pl-[0.3rem] lg:dark:pr-[0.3rem] lg:dark:pl-0 sm:pl-[0.2rem] sm:dark:pr-[0.2rem] sm:dark:pl-0 dark:justify-end
        ${isDark ? 'bg-dark-bg text-dark-t' : 'bg-gray-100 text-black-400'}
      `}
    >
      <span
        className={`text-[1rem] font-semibold transition-all ${isDark ? 'lg:block sm:hidden opacity-100' : 'opacity-0 hidden'}`}
      >
        NIGHT
      </span>
      <div
        className={`lg:w-[3rem] lg:h-[3rem] sm:w-[1.5rem] sm:h-[1.5rem] bg-white rounded-full flex items-center justify-center transition-transform`}
      >
        {isDark ? (
          <Image src={moon} alt="dark" width={20} height={20} className="lg:block sm:hidden" />
        ) : (
          <Image src={sun} alt="light" width={20} height={20} className="lg:block sm:hidden" />
        )}
        {isDark ? (
          <Image src={moon} alt="dark" width={10} height={10} className="lg:hidden sm:block" />
        ) : (
          <Image src={sun} alt="light" width={10} height={10} className="lg:hidden sm:block" />
        )}
      </div>
      <span className={`text-[1rem] font-bold transition-all ${isDark ? 'opacity-0 hidden' : 'opacity-100 lg:block sm:hidden'}`}>
        DAY
      </span>
    </button>
  );
}
