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
  ToggleField,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { RegistrationSelect } from "../registration/RegistrationSelect";
import { Notification } from "../api/notification/Notification";
import { NotificationCreateInput } from "../api/notification/NotificationCreateInput";

const INITIAL_VALUES = {} as NotificationCreateInput;

export const CreateNotification = (): React.ReactElement => {
  useBreadcrumbs("/notifications/new", "Create Notification");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Notification,
    AxiosError,
    NotificationCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/notifications", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/notifications"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: NotificationCreateInput) => {
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
            <FormHeader title={"Create Notification"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <ToggleField label="Disabled" name="disabled" />
          </div>
          <div>
            <TextField type="email" label="Email" name="email" />
          </div>
          <div>
            <TextField label="Fax" name="fax" />
          </div>
          <div>
            <TextField label="Phone" name="phone" />
          </div>
          <div>
            <RegistrationSelect
              label="Registration ID"
              name="registrationId.id"
            />
          </div>
          <div>
            <ToggleField label="Send Fax" name="sendFax" />
          </div>
          <div>
            <ToggleField label="Send SMS" name="sendSms" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
