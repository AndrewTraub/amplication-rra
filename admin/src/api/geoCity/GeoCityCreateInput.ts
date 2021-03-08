import { GeoCountryWhereUniqueInput } from "../geoCountry/GeoCountryWhereUniqueInput";
import { GeoStateWhereUniqueInput } from "../geoState/GeoStateWhereUniqueInput";

export type GeoCityCreateInput = {
  country: GeoCountryWhereUniqueInput;
  latitude: number;
  longitude: number;
  name: string;
  state: GeoStateWhereUniqueInput;
};
