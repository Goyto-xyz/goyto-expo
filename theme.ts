import { makeTheme } from 'dripsy';

const theme = makeTheme({
  colors: {
    $primary: '#003049',
    $secondary: '#A2D2FF',
    $blue100: '#BDE0FE',
    $primary200: 'rgba(0, 48, 73, 0.2)',
    $success: '#01B34E'
  },
  space: {
    $0: 0,
    $1: 4,
    $2: 8,
    $3: 12,
    $4: 16,
    $5: 20,
    $6: 24
  },
  fonts: {
    body: 'Inter_400Regular'
  },
  fontSizes: {
    $0: 12,
    $1: 14,
    $2: 16,
    $3: 18,
    $4: 24,
    $5: 28,
    $6: 32
  },
  text: {
    p: {
      fontFamily: 'body',
      fontSize: '$2'
    }
  }
});

export default theme;
