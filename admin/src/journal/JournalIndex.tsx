import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { JournalList } from "./JournalList";
import { CreateJournal } from "./CreateJournal";
import { Journal } from "./Journal";

export const JournalIndex = (): React.ReactElement => {
  useBreadcrumbs("/journals/", "Journals");

  return (
    <Switch>
      <PrivateRoute exact path={"/journals/"} component={JournalList} />
      <PrivateRoute path={"/journals/new"} component={CreateJournal} />
      <PrivateRoute path={"/journals/:id"} component={Journal} />
    </Switch>
  );
};
