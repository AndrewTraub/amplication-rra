import { GeoCountryWhereUniqueInput } from "../geoCountry/GeoCountryWhereUniqueInput";

export type GeoState = {
  country: GeoCountryWhereUniqueInput;
  id: string;
  name: string;
};
