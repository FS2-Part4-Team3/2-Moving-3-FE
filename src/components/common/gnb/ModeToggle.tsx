'use client';

import { animated, useSpring } from '@react-spring/web';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import moon from '@/../public/assets/common/gnb/moon.svg';
import sun from '@/../public/assets/common/gnb/sun.svg';

export function ModeToggle() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setTheme('system');
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const currentTheme = theme === 'system' ? systemTheme : theme;
      setIsDark(currentTheme === 'dark');
    }
  }, [mounted, theme, systemTheme]);

  const nightStyle = useSpring({
    opacity: isDark ? 1 : 0,
    config: { tension: 100, friction: 20 },
  });

  const dayStyle = useSpring({
    opacity: isDark ? 0 : 1,
    config: { tension: 100, friction: 20 },
  });

  const toggleSpring = useSpring({
    transform: isDark ? (windowWidth >= 1200 ? 'translateX(4rem)' : 'translateX(2.1rem)') : 'translateX(0rem)',
    config: { tension: 150, friction: 20 },
  });

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`relative lg:w-[7.5rem] lg:h-[4rem] sm:h-[2rem] sm:w-[4rem] rounded-[3rem] flex items-center border border-dark-t 
        lg:pl-[0.3rem] lg:dark:pr-[0.3rem] lg:dark:pl-0 sm:pl-[0.2rem] sm:dark:pr-[0.2rem] sm:dark:pl-0
        ${isDark ? 'bg-dark-bg text-dark-t' : 'bg-gray-100 text-black-400'}
      `}
    >
      <animated.span
        className={`absolute left-[0.5rem] text-[1rem] font-semibold ${isDark ? 'lg:block sm:hidden' : 'hidden'}`}
        style={nightStyle}
      >
        NIGHT
      </animated.span>
      <animated.span
        className={`absolute right-[1.4rem] text-[1rem] font-bold ${isDark ? 'hidden' : 'lg:block sm:hidden'}`}
        style={dayStyle}
      >
        DAY
      </animated.span>
      <animated.div style={toggleSpring} className="absolute">
        <div
          className={`lg:w-[3rem] lg:h-[3rem] sm:w-[1.5rem] sm:h-[1.5rem] bg-white rounded-full flex items-center justify-center`}
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
      </animated.div>
    </button>
  );
}
