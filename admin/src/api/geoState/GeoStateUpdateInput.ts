import { GeoCountryWhereUniqueInput } from "../geoCountry/GeoCountryWhereUniqueInput";

export type GeoStateUpdateInput = {
  country?: GeoCountryWhereUniqueInput;
  name?: string;
};
