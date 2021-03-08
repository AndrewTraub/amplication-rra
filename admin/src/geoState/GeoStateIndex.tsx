import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { GeoStateList } from "./GeoStateList";
import { CreateGeoState } from "./CreateGeoState";
import { GeoState } from "./GeoState";

export const GeoStateIndex = (): React.ReactElement => {
  useBreadcrumbs("/geo-states/", "Geo States");

  return (
    <Switch>
      <PrivateRoute exact path={"/geo-states/"} component={GeoStateList} />
      <PrivateRoute path={"/geo-states/new"} component={CreateGeoState} />
      <PrivateRoute path={"/geo-states/:id"} component={GeoState} />
    </Switch>
  );
};
