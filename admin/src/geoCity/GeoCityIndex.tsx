import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { GeoCityList } from "./GeoCityList";
import { CreateGeoCity } from "./CreateGeoCity";
import { GeoCity } from "./GeoCity";

export const GeoCityIndex = (): React.ReactElement => {
  useBreadcrumbs("/geo-cities/", "Geo Cities");

  return (
    <Switch>
      <PrivateRoute exact path={"/geo-cities/"} component={GeoCityList} />
      <PrivateRoute path={"/geo-cities/new"} component={CreateGeoCity} />
      <PrivateRoute path={"/geo-cities/:id"} component={GeoCity} />
    </Switch>
  );
};
