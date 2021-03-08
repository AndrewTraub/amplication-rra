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
import { LogText } from "../api/logText/LogText";
import { LogTextCreateInput } from "../api/logText/LogTextCreateInput";

const INITIAL_VALUES = {} as LogTextCreateInput;

export const CreateLogText = (): React.ReactElement => {
  useBreadcrumbs("/log-texts/new", "Create Log SMS");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    LogText,
    AxiosError,
    LogTextCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/log-texts", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/log-texts"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: LogTextCreateInput) => {
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
            <FormHeader title={"Create Log SMS"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
