import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { LogList } from "./LogList";
import { CreateLog } from "./CreateLog";
import { Log } from "./Log";

export const LogIndex = (): React.ReactElement => {
  useBreadcrumbs("/logs/", "Logs");

  return (
    <Switch>
      <PrivateRoute exact path={"/logs/"} component={LogList} />
      <PrivateRoute path={"/logs/new"} component={CreateLog} />
      <PrivateRoute path={"/logs/:id"} component={Log} />
    </Switch>
  );
};
