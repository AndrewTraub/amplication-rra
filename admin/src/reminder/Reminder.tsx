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
import { StateSelect } from "../state/StateSelect";
import { Reminder as TReminder } from "../api/reminder/Reminder";
import { ReminderUpdateInput } from "../api/reminder/ReminderUpdateInput";

export const Reminder = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/reminders/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TReminder,
    AxiosError,
    [string, string]
  >(["get-/api/reminders", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/reminders"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TReminder, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/reminders"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//reminders");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TReminder, AxiosError, ReminderUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/reminders"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: ReminderUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.title);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["active", "body", "day", "month", "state", "title"]),
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
                title={`${"Reminder"} ${
                  data?.title && data?.title.length ? data.title : data?.id
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
              <ToggleField label="Active" name="active" />
            </div>
            <div>
              <TextField label="Body" name="body" textarea />
            </div>
            <div>
              <TextField type="number" step={1} label="Day" name="day" />
            </div>
            <div>
              <TextField type="number" step={1} label="Month" name="month" />
            </div>
            <div>
              <StateSelect label="State" name="state.id" />
            </div>
            <div>
              <TextField label="Title" name="title" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
