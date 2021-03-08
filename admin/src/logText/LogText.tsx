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
import { LogText as TLogText } from "../api/logText/LogText";
import { LogTextUpdateInput } from "../api/logText/LogTextUpdateInput";

export const LogText = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/log-texts/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TLogText,
    AxiosError,
    [string, string]
  >(["get-/api/log-texts", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/log-texts"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TLogText, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/log-texts"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//log-texts");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TLogText, AxiosError, LogTextUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/log-texts"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: LogTextUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.message);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () =>
      pick(data, [
        "message",
        "notification",
        "registration",
        "response",
        "sent",
        "sentBy",
        "sentToNumber",
        "smsTriggerReason",
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
                title={`${"Log SMS"} ${
                  data?.message && data?.message.length
                    ? data.message
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
              <TextField label="Message" name="message" />
            </div>
            <div>
              <NotificationSelect label="Notification" name="notification.id" />
            </div>
            <div>
              <RegistrationSelect label="Registration" name="registration.id" />
            </div>
            <div>
              <TextField label="Response" name="response" />
            </div>
            <div>
              <TextField type="datetime-local" label="Sent" name="sent" />
            </div>
            <div>
              <TextField label="Sent By" name="sentBy" />
            </div>
            <div>
              <TextField label="Sent To Number" name="sentToNumber" />
            </div>
            <div>
              <TextField label="SMS Trigger Reason" name="smsTriggerReason" />
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
