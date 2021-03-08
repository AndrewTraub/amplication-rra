import { GeoCountryWhereUniqueInput } from "../geoCountry/GeoCountryWhereUniqueInput";

export type GeoStateWhereInput = {
  country?: GeoCountryWhereUniqueInput;
  id?: string;
  name?: string;
};
