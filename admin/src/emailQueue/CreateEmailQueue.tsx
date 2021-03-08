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
  ToggleField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { UserSelect } from "../user/UserSelect";
import { EmailQueue } from "../api/emailQueue/EmailQueue";
import { EmailQueueCreateInput } from "../api/emailQueue/EmailQueueCreateInput";

const INITIAL_VALUES = {} as EmailQueueCreateInput;

export const CreateEmailQueue = (): React.ReactElement => {
  useBreadcrumbs("/email-queues/new", "Create Email Queue");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    EmailQueue,
    AxiosError,
    EmailQueueCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/email-queues", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/email-queues"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: EmailQueueCreateInput) => {
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
            <FormHeader title={"Create Email Queue"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
