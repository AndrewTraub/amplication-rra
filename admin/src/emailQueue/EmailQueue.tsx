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
  ToggleField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { UserSelect } from "../user/UserSelect";
import { EmailQueue as TEmailQueue } from "../api/emailQueue/EmailQueue";
import { EmailQueueUpdateInput } from "../api/emailQueue/EmailQueueUpdateInput";

export const EmailQueue = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/email-queues/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TEmailQueue,
    AxiosError,
    [string, string]
  >(["get-/api/email-queues", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/email-queues"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TEmailQueue, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/email-queues"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//email-queues");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TEmailQueue, AxiosError, EmailQueueUpdateInput>(
    async (data) => {
      const response = await api.patch(`${"/api/email-queues"}/${id}`, data);
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: EmailQueueUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.subject);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () =>
      pick(data, ["message", "sent", "subject", "timeToSend", "type", "user"]),
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
                title={`${"Email Queue"} ${
                  data?.subject && data?.subject.length
                    ? data.subject
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
              <TextField label="Message" name="message" textarea />
            </div>
            <div>
              <ToggleField label="Sent" name="sent" />
            </div>
            <div>
              <TextField label="Subject" name="subject" />
            </div>
            <div>
              <TextField
                type="datetime-local"
                label="Time to Send"
                name="timeToSend"
              />
            </div>
            <div>
              <TextField type="number" step={1} label="Type" name="type" />
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
