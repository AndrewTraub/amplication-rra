import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { GeoCountryList } from "./GeoCountryList";
import { CreateGeoCountry } from "./CreateGeoCountry";
import { GeoCountry } from "./GeoCountry";

export const GeoCountryIndex = (): React.ReactElement => {
  useBreadcrumbs("/geo-countries/", "Geo Countries");

  return (
    <Switch>
      <PrivateRoute exact path={"/geo-countries/"} component={GeoCountryList} />
      <PrivateRoute path={"/geo-countries/new"} component={CreateGeoCountry} />
      <PrivateRoute path={"/geo-countries/:id"} component={GeoCountry} />
    </Switch>
  );
};
