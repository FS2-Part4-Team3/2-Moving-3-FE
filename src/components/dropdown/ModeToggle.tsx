'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-row">
      <button onClick={() => setTheme('light')} className="p-2 bg-gray-200 text-black dark:bg-gray-700 dark:!text-white rounded">
        라이트 모드
      </button>
      <button onClick={() => setTheme('dark')} className="p-2 bg-gray-500 text-white dark:bg-black rounded">
        다크 모드
      </button>
      <button onClick={() => setTheme('system')} className="p-2 bg-blue-50 text-white rounded">
        시스템 모드
      </button>
    </div>
  );
}
