import tinycolor from 'tinycolor2';

export const getBgColor = (color: string) => {
  return tinycolor(color).desaturate(30).lighten(35).toHexString();
};

export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidURL = (url: string) => {
  const urlRegex =
    /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(:\d+)?(\/[^\s]*)?$/i;
  return urlRegex.test(url);
};
