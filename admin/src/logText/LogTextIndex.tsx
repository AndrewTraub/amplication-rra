import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { LogTextList } from "./LogTextList";
import { CreateLogText } from "./CreateLogText";
import { LogText } from "./LogText";

export const LogTextIndex = (): React.ReactElement => {
  useBreadcrumbs("/log-texts/", "Log SMS");

  return (
    <Switch>
      <PrivateRoute exact path={"/log-texts/"} component={LogTextList} />
      <PrivateRoute path={"/log-texts/new"} component={CreateLogText} />
      <PrivateRoute path={"/log-texts/:id"} component={LogText} />
    </Switch>
  );
};
