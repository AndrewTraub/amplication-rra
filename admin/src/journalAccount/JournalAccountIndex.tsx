import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { JournalAccountList } from "./JournalAccountList";
import { CreateJournalAccount } from "./CreateJournalAccount";
import { JournalAccount } from "./JournalAccount";

export const JournalAccountIndex = (): React.ReactElement => {
  useBreadcrumbs("/journal-accounts/", "Journal Accounts");

  return (
    <Switch>
      <PrivateRoute
        exact
        path={"/journal-accounts/"}
        component={JournalAccountList}
      />
      <PrivateRoute
        path={"/journal-accounts/new"}
        component={CreateJournalAccount}
      />
      <PrivateRoute path={"/journal-accounts/:id"} component={JournalAccount} />
    </Switch>
  );
};
