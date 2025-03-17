// Create a function called getNearestLocations that takes in a location and an array of locations and returns the 5 nearest locations to the given location.
// A location is an object with the following shape:
// {
//   lat: number;
//   lng: number;
//   location: any;
// }
//

import { VtMapPlacesResult } from "../../../@types/components/maps";
import { CFCollectionLocation } from "../../../@types/content/CFClollectionLocation";

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

export const getNearestLocations = (
  location: { lat: number; lng: number; location: VtMapPlacesResult },
  locations: { lat: number; lng: number; location: CFCollectionLocation }[]
) => {
  const { lat, lng } = location;
  return locations.sort((a, b) => {
    const aDistance = getDistanceFromLatLonInKm(lat, lng, a.lat, a.lng);
    const bDistance = getDistanceFromLatLonInKm(lat, lng, b.lat, b.lng);
    return aDistance - bDistance;
  });
};
