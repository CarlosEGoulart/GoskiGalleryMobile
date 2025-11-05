export const darkTheme = {
  background: '#161616',
  foreground: '#FFFFFF',
  card: '#242424',
  text: '#FFFFFF',
  subtleText: '#A0A0A0',
  primary: '#383838',
  error: '#CF6679',
  colors: {
    dark: '#161616',
    light: '#FFFFFF',
  },
  dimension: {
    sm: 10,
    md: 20,
    lg: 30,
  },
};

export const lightTheme = {
  background: '#F2F2F7',
  foreground: '#000000',
  card: '#FFFFFF',
  text: '#000000',
  subtleText: '#6C6C70',
  primary: '#383838',
  error: '#FF3B30',
  colors: {
    dark: '#161616',
    light: '#FFFFFF',
  },
  dimension: {
    sm: 10,
    md: 20,
    lg: 30,
  },
};

const theme = darkTheme;
export default theme;

export type Theme = typeof darkTheme;
