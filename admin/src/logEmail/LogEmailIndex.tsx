import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { LogEmailList } from "./LogEmailList";
import { CreateLogEmail } from "./CreateLogEmail";
import { LogEmail } from "./LogEmail";

export const LogEmailIndex = (): React.ReactElement => {
  useBreadcrumbs("/log-emails/", "Log Emails");

  return (
    <Switch>
      <PrivateRoute exact path={"/log-emails/"} component={LogEmailList} />
      <PrivateRoute path={"/log-emails/new"} component={CreateLogEmail} />
      <PrivateRoute path={"/log-emails/:id"} component={LogEmail} />
    </Switch>
  );
};
