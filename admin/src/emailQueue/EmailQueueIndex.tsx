import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { EmailQueueList } from "./EmailQueueList";
import { CreateEmailQueue } from "./CreateEmailQueue";
import { EmailQueue } from "./EmailQueue";

export const EmailQueueIndex = (): React.ReactElement => {
  useBreadcrumbs("/email-queues/", "Email Queues");

  return (
    <Switch>
      <PrivateRoute exact path={"/email-queues/"} component={EmailQueueList} />
      <PrivateRoute path={"/email-queues/new"} component={CreateEmailQueue} />
      <PrivateRoute path={"/email-queues/:id"} component={EmailQueue} />
    </Switch>
  );
};
