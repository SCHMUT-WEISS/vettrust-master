export default function getGooglePlaceInfoOnMapsUrl(
  geometry: { lat: number; lng: number },
  googlePlaceId: string
) {
  return `https://www.google.com/maps/search/?api=1&query=${geometry.lat},${geometry.lng}&query_place_id=${googlePlaceId}`;
}
