import React, { useCallback, useContext } from "react";
import { Route, Switch, useHistory, Link, NavLink } from "react-router-dom";
import Navigation from "./Navigation";
import Login from "./Login";
import { Credentials, setCredentials, removeCredentials } from "./auth";
import {
  Menu,
  MainLayout,
  Page,
  CircleBadge,
  Breadcrumbs,
} from "@amplication/design-system";
import BreadcrumbsContext from "./components/breadcrumbs/BreadcrumbsContext";
import BreadcrumbsProvider from "./components/breadcrumbs/BreadcrumbsProvider";
import useBreadcrumbs from "./components/breadcrumbs/use-breadcrumbs";
import PrivateRoute from "./components/PrivateRoute";
import { UserIndex } from "./user/UserIndex";
import { CompanyIndex } from "./company/CompanyIndex";
import { RegistrationIndex } from "./registration/RegistrationIndex";
import { NotificationIndex } from "./notification/NotificationIndex";
import { StateIndex } from "./state/StateIndex";
import { DocumentIndex } from "./document/DocumentIndex";
import { AgentIndex } from "./agent/AgentIndex";
import { JournalCategoryIndex } from "./journalCategory/JournalCategoryIndex";
import { JournalAccountIndex } from "./journalAccount/JournalAccountIndex";
import { JournalIndex } from "./journal/JournalIndex";
import { FormIndex } from "./form/FormIndex";
import { EmailListIndex } from "./emailList/EmailListIndex";
import { EmailTemplateIndex } from "./emailTemplate/EmailTemplateIndex";
import { EmailQueueIndex } from "./emailQueue/EmailQueueIndex";
import { LogIndex } from "./log/LogIndex";
import { LogEmailIndex } from "./logEmail/LogEmailIndex";
import { LogTextIndex } from "./logText/LogTextIndex";
import { ReminderIndex } from "./reminder/ReminderIndex";
import { AffiliateStatIndex } from "./affiliateStat/AffiliateStatIndex";
import { GeoCountryIndex } from "./geoCountry/GeoCountryIndex";
import { GeoStateIndex } from "./geoState/GeoStateIndex";
import { GeoCityIndex } from "./geoCity/GeoCityIndex";
import { CouponIndex } from "./coupon/CouponIndex";

const App = (): React.ReactElement => {
  const history = useHistory();
  const handleLogin = useCallback(
    (credentials: Credentials) => {
      setCredentials(credentials);
      history.push("/");
    },
    [history]
  );

  return (
    <BreadcrumbsProvider>
      <MainLayout>
        <Switch>
          <Route path="/login" render={() => <Login onLogin={handleLogin} />} />
          <PrivateRoute path="/" component={AppLayout} />
        </Switch>
      </MainLayout>
    </BreadcrumbsProvider>
  );
};

export default App;

/**@todo: move to a separate template file */
const AppLayout = (): React.ReactElement => {
  const history = useHistory();
  useBreadcrumbs("/", "RRA");
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  const signOut = useCallback(() => {
    removeCredentials();
    history.push("/login");
  }, [history]);

  // Use navLink for breadcrumbs to prevent page reload
  const ItemLink = ({ href, ...rest }: { href: string }) => (
    <NavLink {...rest} to={href} />
  );

  return (
    <>
      <Menu
        onSignOutClick={signOut}
        logoContent={
          <Link to="/">
            <CircleBadge name={"RRA"} />
          </Link>
        }
      ></Menu>
      <MainLayout.Content>
        <Breadcrumbs>
          {}
          {breadcrumbsContext.breadcrumbsItems.map((item, index, items) => (
            <Breadcrumbs.Item
              as={ItemLink}
              key={index}
              selected={index + 1 === items.length}
              href={item.url}
            >
              {item.name}
            </Breadcrumbs.Item>
          ))}
        </Breadcrumbs>
        <Page>
          <Switch>
            <PrivateRoute exact path="/" component={Navigation} />
            <PrivateRoute path="/users" component={UserIndex} />
            <PrivateRoute path="/companies" component={CompanyIndex} />
            <PrivateRoute path="/registrations" component={RegistrationIndex} />
            <PrivateRoute path="/notifications" component={NotificationIndex} />
            <PrivateRoute path="/states" component={StateIndex} />
            <PrivateRoute path="/documents" component={DocumentIndex} />
            <PrivateRoute path="/agents" component={AgentIndex} />
            <PrivateRoute
              path="/journal-categories"
              component={JournalCategoryIndex}
            />
            <PrivateRoute
              path="/journal-accounts"
              component={JournalAccountIndex}
            />
            <PrivateRoute path="/journals" component={JournalIndex} />
            <PrivateRoute path="/forms" component={FormIndex} />
            <PrivateRoute path="/email-lists" component={EmailListIndex} />
            <PrivateRoute
              path="/email-templates"
              component={EmailTemplateIndex}
            />
            <PrivateRoute path="/email-queues" component={EmailQueueIndex} />
            <PrivateRoute path="/logs" component={LogIndex} />
            <PrivateRoute path="/log-emails" component={LogEmailIndex} />
            <PrivateRoute path="/log-texts" component={LogTextIndex} />
            <PrivateRoute path="/reminders" component={ReminderIndex} />
            <PrivateRoute
              path="/affiliate-stats"
              component={AffiliateStatIndex}
            />
            <PrivateRoute path="/geo-countries" component={GeoCountryIndex} />
            <PrivateRoute path="/geo-states" component={GeoStateIndex} />
            <PrivateRoute path="/geo-cities" component={GeoCityIndex} />
            <PrivateRoute path="/coupons" component={CouponIndex} />
          </Switch>
        </Page>
      </MainLayout.Content>
    </>
  );
};
