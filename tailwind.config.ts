import type { Config } from 'tailwindcss';

const config: Config = {
  mode: 'jit',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '375px',
      md: '744px',
      lg: '1200px',
    },
    colors: {
      'black-100': '#6B6B6B',
      'black-200': '#525252',
      'black-300': '#373737',
      'black-400': '#1F1F1F',
      'black-500': '#040404',
      'gray-100': '#DEDEDE',
      'gray-200': '#C4C4C4',
      'gray-300': '#ABABAB',
      'gray-400': '#999999',
      'gray-500': '#808080',
      'blue-50': '#F5FAFF',
      'blue-100': '#E9F4FF',
      'blue-200': '#4DA9FF',
      'blue-300': '#1B92FF',
      'blue-400': '#242945',
      'yellow-100': '#FFC149',
      'red-100': '#FFEEF0',
      'red-200': '#FF4F64',
      'background-100': '#FAFAFA',
      'background-200': '#F7F7F7',
      'background-300': '#EFEFEF',
      'background-400': '#F4F7FB',
      'line-100': '#F2F2F2',
      'line-200': '#E6E6E6',
      white: '#FFFFFF',
      black: '#000000',
    },
    extend: {
      textColor: {
        DEFAULT: '#1F1F1F',
      },
      boxShadow: {
        custom1: '4px 4px 10px 0px rgba(225, 225, 225, 0.102)',
        custom2: 'inset 6px 6px 10px 0px rgba(244, 244, 244, 0.2)',
        custom3: '2px 2px 10px rgba(237, 237, 237, 1), -2px -2px 10px rgba(237, 237, 237, 1)',
        customBoth: '4px 4px 10px 0px rgba(225, 225, 225, 0.102), inset 6px 6px 10px 0px rgba(244, 244, 244, 0.2)',
        chipServiceShadow: '4px 4px 10px 0px rgba(230, 230, 230, 0.25)',
        chipAreaShadow: 'box-shadow: 4px 4px 10px 0px rgba(230, 230, 230, 0.161)',
      },
    },
  },
};

export default config;
