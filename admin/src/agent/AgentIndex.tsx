import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { AgentList } from "./AgentList";
import { CreateAgent } from "./CreateAgent";
import { Agent } from "./Agent";

export const AgentIndex = (): React.ReactElement => {
  useBreadcrumbs("/agents/", "Agents");

  return (
    <Switch>
      <PrivateRoute exact path={"/agents/"} component={AgentList} />
      <PrivateRoute path={"/agents/new"} component={CreateAgent} />
      <PrivateRoute path={"/agents/:id"} component={Agent} />
    </Switch>
  );
};
