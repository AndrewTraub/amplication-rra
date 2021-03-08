import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { PdfFormList } from "./PdfFormList";
import { CreatePdfForm } from "./CreatePdfForm";
import { PdfForm } from "./PdfForm";

export const PdfFormIndex = (): React.ReactElement => {
  useBreadcrumbs("/pdf-forms/", "PDF Forms");

  return (
    <Switch>
      <PrivateRoute exact path={"/pdf-forms/"} component={PdfFormList} />
      <PrivateRoute path={"/pdf-forms/new"} component={CreatePdfForm} />
      <PrivateRoute path={"/pdf-forms/:id"} component={PdfForm} />
    </Switch>
  );
};
