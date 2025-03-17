/* eslint-disable no-undef */
import { Merge } from "../index";

export type VtMapInstance = google.maps.Map;
export type VtMapPinCoordinates = Merge<
  google.maps.LatLng,
  { id?: string; locationId?: string }
>;
export type VtMapBounds = google.maps.LatLngBounds;
export type VtMapSearchInstance = google.maps.places.SearchBox;
export type VtMapAutoCompleteInstance = google.maps.places.Autocomplete;
export type VtMapPlacesResult = google.maps.places.PlaceResult;
