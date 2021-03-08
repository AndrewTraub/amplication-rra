import { GeoCountryWhereUniqueInput } from "../geoCountry/GeoCountryWhereUniqueInput";

export type GeoStateCreateInput = {
  country: GeoCountryWhereUniqueInput;
  name: string;
};
