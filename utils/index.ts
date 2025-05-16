import tinycolor from 'tinycolor2';

export const getBgColor = (color: string) => {
  return tinycolor(color).desaturate(30).lighten(35).toHexString();
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
