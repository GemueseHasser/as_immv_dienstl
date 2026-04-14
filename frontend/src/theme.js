import { alpha, createTheme } from '@mui/material/styles';

const brand = '#3a4045';
const gold = '#a88e69';
const bg = '#f4f2ee';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: brand,
      dark: '#1f2327',
      light: '#687178',
      contrastText: '#ffffff',
    },
    secondary: {
      main: gold,
      dark: '#8e7553',
      light: '#c8b090',
      contrastText: '#1f2327',
    },
    background: {
      default: bg,
      paper: alpha('#ffffff', 0.86),
    },
    text: {
      primary: '#23272b',
      secondary: '#66717b',
    },
  },
  shape: {
    borderRadius: 24,
  },
  typography: {
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: { fontWeight: 700, letterSpacing: '-0.055em' },
    h2: { fontWeight: 700, letterSpacing: '-0.05em' },
    h3: { fontWeight: 700, letterSpacing: '-0.04em' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shadows: [
    'none',
    '0 10px 20px rgba(17,20,24,0.05)',
    '0 14px 28px rgba(17,20,24,0.06)',
    '0 18px 36px rgba(17,20,24,0.08)',
    '0 22px 44px rgba(17,20,24,0.09)',
    '0 26px 52px rgba(17,20,24,0.10)',
    '0 30px 60px rgba(17,20,24,0.11)',
    '0 35px 68px rgba(17,20,24,0.12)',
    '0 40px 76px rgba(17,20,24,0.13)',
    '0 42px 84px rgba(17,20,24,0.14)',
    '0 44px 88px rgba(17,20,24,0.15)',
    '0 46px 92px rgba(17,20,24,0.16)',
    '0 48px 96px rgba(17,20,24,0.17)',
    '0 50px 100px rgba(17,20,24,0.18)',
    '0 52px 104px rgba(17,20,24,0.19)',
    '0 54px 108px rgba(17,20,24,0.20)',
    '0 56px 112px rgba(17,20,24,0.21)',
    '0 58px 116px rgba(17,20,24,0.22)',
    '0 60px 120px rgba(17,20,24,0.23)',
    '0 62px 124px rgba(17,20,24,0.24)',
    '0 64px 128px rgba(17,20,24,0.25)',
    '0 66px 132px rgba(17,20,24,0.26)',
    '0 68px 136px rgba(17,20,24,0.27)',
    '0 70px 140px rgba(17,20,24,0.28)',
    '0 72px 144px rgba(17,20,24,0.29)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: `${alpha(brand, 0.35)} transparent`,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 20,
          minHeight: 46,
          boxShadow: '0 16px 34px rgba(17,20,24,0.09)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(16px)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
