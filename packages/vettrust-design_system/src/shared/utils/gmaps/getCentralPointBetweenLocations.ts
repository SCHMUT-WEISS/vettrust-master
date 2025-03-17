/* eslint-disable array-callback-return */

export const getCentralPointBetweenLocations = (
  locations: { lat: number; lng: number }[]
) => {
  if (locations.length === 1) {
    return locations[0];
  }

  let X = 0;
  let Y = 0;
  let Z = 0;

  locations.map(location => {
    const lat = (location.lat * Math.PI) / 180;
    const lng = (location.lng * Math.PI) / 180;

    X += Math.cos(lat) * Math.cos(lng);
    Y += Math.cos(lat) * Math.sin(lng);
    Z += Math.sin(lat);
  });

  const total = locations.length;

  X /= total;
  Y /= total;
  Z /= total;

  const centralLng = Math.atan2(Y, X);
  const centralSquareRoot = Math.sqrt(X * X + Y * Y);
  const centralLat = Math.atan2(Z, centralSquareRoot);

  return {
    lat: (centralLat * 180) / Math.PI,
    lng: (centralLng * 180) / Math.PI,
  };
};
