import React from "react";
import { Link } from "react-router-dom";
import { Panel, PanelHeader, EnumPanelStyle } from "@amplication/design-system";

const Navigation = (): React.ReactElement => {
  return (
    <>
      <NavigationItem name="Users" to="/users" />
      <NavigationItem name="Companies" to="/companies" />
      <NavigationItem name="Registrations" to="/registrations" />
      <NavigationItem name="Notifications" to="/notifications" />
      <NavigationItem name="States" to="/states" />
      <NavigationItem name="Documents" to="/documents" />
      <NavigationItem name="Agents" to="/agents" />
      <NavigationItem name="Journal Categories" to="/journal-categories" />
      <NavigationItem name="Journal Accounts" to="/journal-accounts" />
      <NavigationItem name="Journals" to="/journals" />
      <NavigationItem name="Forms" to="/forms" />
      <NavigationItem name="Email Lists" to="/email-lists" />
      <NavigationItem name="Email Templates" to="/email-templates" />
      <NavigationItem name="Email Queues" to="/email-queues" />
      <NavigationItem name="Logs" to="/logs" />
      <NavigationItem name="Log Emails" to="/log-emails" />
      <NavigationItem name="Log SMS" to="/log-texts" />
      <NavigationItem name="Reminders" to="/reminders" />
      <NavigationItem name="Affiliate Stats" to="/affiliate-stats" />
      <NavigationItem name="Geo Countries" to="/geo-countries" />
      <NavigationItem name="Geo States" to="/geo-states" />
      <NavigationItem name="Geo Cities" to="/geo-cities" />
      <NavigationItem name="Coupons" to="/coupons" />
    </>
  );
};

export default Navigation;

const NavigationItem = ({
  to,
  name,
}: {
  to: string;
  name: string;
}): React.ReactElement => (
  <Link to={to}>
    <Panel panelStyle={EnumPanelStyle.Bordered}>
      <PanelHeader>{name}</PanelHeader>
      Create, update, search and delete {name}
    </Panel>
  </Link>
);
