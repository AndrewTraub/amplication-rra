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
  ToggleField,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { RegistrationSelect } from "../registration/RegistrationSelect";
import { Notification as TNotification } from "../api/notification/Notification";
import { NotificationUpdateInput } from "../api/notification/NotificationUpdateInput";

export const Notification = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/notifications/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TNotification,
    AxiosError,
    [string, string]
  >(["get-/api/notifications", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/notifications"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TNotification, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/notifications"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//notifications");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TNotification, AxiosError, NotificationUpdateInput>(
    async (data) => {
      const response = await api.patch(`${"/api/notifications"}/${id}`, data);
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: NotificationUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.fax);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () =>
      pick(data, [
        "disabled",
        "email",
        "fax",
        "phone",
        "registrationId",
        "sendFax",
        "sendSms",
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
                title={`${"Notification"} ${
                  data?.fax && data?.fax.length ? data.fax : data?.id
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
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
