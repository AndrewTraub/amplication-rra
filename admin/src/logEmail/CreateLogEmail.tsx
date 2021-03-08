import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { NotificationSelect } from "../notification/NotificationSelect";
import { RegistrationSelect } from "../registration/RegistrationSelect";
import { UserSelect } from "../user/UserSelect";
import { LogEmail } from "../api/logEmail/LogEmail";
import { LogEmailCreateInput } from "../api/logEmail/LogEmailCreateInput";

const INITIAL_VALUES = {} as LogEmailCreateInput;

export const CreateLogEmail = (): React.ReactElement => {
  useBreadcrumbs("/log-emails/new", "Create Log Email");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    LogEmail,
    AxiosError,
    LogEmailCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/log-emails", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/log-emails"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: LogEmailCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Log Email"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
