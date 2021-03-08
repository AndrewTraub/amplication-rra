import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { StateList } from "./StateList";
import { CreateState } from "./CreateState";
import { State } from "./State";

export const StateIndex = (): React.ReactElement => {
  useBreadcrumbs("/states/", "States");

  return (
    <Switch>
      <PrivateRoute exact path={"/states/"} component={StateList} />
      <PrivateRoute path={"/states/new"} component={CreateState} />
      <PrivateRoute path={"/states/:id"} component={State} />
    </Switch>
  );
};
