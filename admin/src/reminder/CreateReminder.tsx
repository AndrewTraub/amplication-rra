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
import { StateSelect } from "../state/StateSelect";
import { Reminder } from "../api/reminder/Reminder";
import { ReminderCreateInput } from "../api/reminder/ReminderCreateInput";

const INITIAL_VALUES = {} as ReminderCreateInput;

export const CreateReminder = (): React.ReactElement => {
  useBreadcrumbs("/reminders/new", "Create Reminder");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Reminder,
    AxiosError,
    ReminderCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/reminders", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/reminders"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: ReminderCreateInput) => {
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
            <FormHeader title={"Create Reminder"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
