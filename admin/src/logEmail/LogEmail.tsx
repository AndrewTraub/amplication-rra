import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { NotificationSelect } from "../notification/NotificationSelect";
import { RegistrationSelect } from "../registration/RegistrationSelect";
import { UserSelect } from "../user/UserSelect";
import { LogEmail as TLogEmail } from "../api/logEmail/LogEmail";
import { LogEmailUpdateInput } from "../api/logEmail/LogEmailUpdateInput";

export const LogEmail = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/log-emails/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TLogEmail,
    AxiosError,
    [string, string]
  >(["get-/api/log-emails", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/log-emails"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TLogEmail, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/log-emails"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//log-emails");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TLogEmail, AxiosError, LogEmailUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/log-emails"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: LogEmailUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.emailEvent);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () =>
      pick(data, [
        "emailEvent",
        "emailTo",
        "messageId",
        "notification",
        "registration",
        "sentOn",
        "user",
      ]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Log Email"} ${
                  data?.emailEvent && data?.emailEvent.length
                    ? data.emailEvent
                    : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
                  Save
                </Button>
              </FormHeader>
            }
          >
            <div>
              <TextField label="Email Event" name="emailEvent" />
            </div>
            <div>
              <TextField type="email" label="Email To" name="emailTo" />
            </div>
            <div>
              <TextField label="Message ID" name="messageId" />
            </div>
            <div>
              <NotificationSelect label="Notification" name="notification.id" />
            </div>
            <div>
              <RegistrationSelect label="Registration" name="registration.id" />
            </div>
            <div>
              <TextField type="datetime-local" label="Sent On" name="sentOn" />
            </div>
            <div>
              <UserSelect label="User" name="user.id" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
