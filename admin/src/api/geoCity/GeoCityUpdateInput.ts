import { GeoCountryWhereUniqueInput } from "../geoCountry/GeoCountryWhereUniqueInput";
import { GeoStateWhereUniqueInput } from "../geoState/GeoStateWhereUniqueInput";

export type GeoCityUpdateInput = {
  country?: GeoCountryWhereUniqueInput;
  latitude?: number;
  longitude?: number;
  name?: string;
  state?: GeoStateWhereUniqueInput;
};
