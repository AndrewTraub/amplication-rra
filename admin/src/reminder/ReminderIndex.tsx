import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ReminderList } from "./ReminderList";
import { CreateReminder } from "./CreateReminder";
import { Reminder } from "./Reminder";

export const ReminderIndex = (): React.ReactElement => {
  useBreadcrumbs("/reminders/", "Reminders");

  return (
    <Switch>
      <PrivateRoute exact path={"/reminders/"} component={ReminderList} />
      <PrivateRoute path={"/reminders/new"} component={CreateReminder} />
      <PrivateRoute path={"/reminders/:id"} component={Reminder} />
    </Switch>
  );
};
