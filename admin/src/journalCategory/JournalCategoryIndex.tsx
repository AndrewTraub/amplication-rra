import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { JournalCategoryList } from "./JournalCategoryList";
import { CreateJournalCategory } from "./CreateJournalCategory";
import { JournalCategory } from "./JournalCategory";

export const JournalCategoryIndex = (): React.ReactElement => {
  useBreadcrumbs("/journal-categories/", "Journal Categories");

  return (
    <Switch>
      <PrivateRoute
        exact
        path={"/journal-categories/"}
        component={JournalCategoryList}
      />
      <PrivateRoute
        path={"/journal-categories/new"}
        component={CreateJournalCategory}
      />
      <PrivateRoute
        path={"/journal-categories/:id"}
        component={JournalCategory}
      />
    </Switch>
  );
};
