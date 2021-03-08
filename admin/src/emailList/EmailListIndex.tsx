import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { EmailListList } from "./EmailListList";
import { CreateEmailList } from "./CreateEmailList";
import { EmailList } from "./EmailList";

export const EmailListIndex = (): React.ReactElement => {
  useBreadcrumbs("/email-lists/", "Email Lists");

  return (
    <Switch>
      <PrivateRoute exact path={"/email-lists/"} component={EmailListList} />
      <PrivateRoute path={"/email-lists/new"} component={CreateEmailList} />
      <PrivateRoute path={"/email-lists/:id"} component={EmailList} />
    </Switch>
  );
};
