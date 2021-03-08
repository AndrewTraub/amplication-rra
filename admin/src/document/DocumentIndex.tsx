import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { DocumentList } from "./DocumentList";
import { CreateDocument } from "./CreateDocument";
import { Document } from "./Document";

export const DocumentIndex = (): React.ReactElement => {
  useBreadcrumbs("/documents/", "Documents");

  return (
    <Switch>
      <PrivateRoute exact path={"/documents/"} component={DocumentList} />
      <PrivateRoute path={"/documents/new"} component={CreateDocument} />
      <PrivateRoute path={"/documents/:id"} component={Document} />
    </Switch>
  );
};
