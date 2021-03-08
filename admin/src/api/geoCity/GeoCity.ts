import { GeoCountryWhereUniqueInput } from "../geoCountry/GeoCountryWhereUniqueInput";
import { GeoStateWhereUniqueInput } from "../geoState/GeoStateWhereUniqueInput";

export type GeoCity = {
  country: GeoCountryWhereUniqueInput;
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  state: GeoStateWhereUniqueInput;
};
