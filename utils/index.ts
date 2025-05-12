import tinycolor from 'tinycolor2';

export const getBgColor = (color: string) => {
  return tinycolor(color).desaturate(30).lighten(35).toHexString();
};
