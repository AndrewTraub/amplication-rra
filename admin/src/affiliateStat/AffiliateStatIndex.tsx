import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { AffiliateStatList } from "./AffiliateStatList";
import { CreateAffiliateStat } from "./CreateAffiliateStat";
import { AffiliateStat } from "./AffiliateStat";

export const AffiliateStatIndex = (): React.ReactElement => {
  useBreadcrumbs("/affiliate-stats/", "Affiliate Stats");

  return (
    <Switch>
      <PrivateRoute
        exact
        path={"/affiliate-stats/"}
        component={AffiliateStatList}
      />
      <PrivateRoute
        path={"/affiliate-stats/new"}
        component={CreateAffiliateStat}
      />
      <PrivateRoute path={"/affiliate-stats/:id"} component={AffiliateStat} />
    </Switch>
  );
};
