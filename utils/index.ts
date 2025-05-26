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

export const generateNearbyCoordinates = (
  center: [number, number],
  count: number,
  radiusInMeters: number
): [number, number][] => {
  const earthRadius = 6378137;
  const coords: [number, number][] = [];

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * radiusInMeters;

    const dx = distance * Math.cos(angle);
    const dy = distance * Math.sin(angle);

    const deltaLat = dy / earthRadius;
    const deltaLng = dx / (earthRadius * Math.cos((Math.PI * center[1]) / 180));

    const newLat = center[1] + (deltaLat * 180) / Math.PI;
    const newLng = center[0] + (deltaLng * 180) / Math.PI;

    coords.push([newLng, newLat]);
  }

  return coords;
};
