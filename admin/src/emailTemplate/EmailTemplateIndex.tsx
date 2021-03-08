import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { EmailTemplateList } from "./EmailTemplateList";
import { CreateEmailTemplate } from "./CreateEmailTemplate";
import { EmailTemplate } from "./EmailTemplate";

export const EmailTemplateIndex = (): React.ReactElement => {
  useBreadcrumbs("/email-templates/", "Email Templates");

  return (
    <Switch>
      <PrivateRoute
        exact
        path={"/email-templates/"}
        component={EmailTemplateList}
      />
      <PrivateRoute
        path={"/email-templates/new"}
        component={CreateEmailTemplate}
      />
      <PrivateRoute path={"/email-templates/:id"} component={EmailTemplate} />
    </Switch>
  );
};
