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
import { EmailList } from "../api/emailList/EmailList";
import { EmailListCreateInput } from "../api/emailList/EmailListCreateInput";

const INITIAL_VALUES = {} as EmailListCreateInput;

export const CreateEmailList = (): React.ReactElement => {
  useBreadcrumbs("/email-lists/new", "Create Email List");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    EmailList,
    AxiosError,
    EmailListCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/email-lists", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/email-lists"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: EmailListCreateInput) => {
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
            <FormHeader title={"Create Email List"}>
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
            <TextField label="Description" name="description" textarea />
          </div>
          <div>
            <TextField label="Name" name="name" />
          </div>
          <div>
            <TextField type="number" step={1} label="Stage" name="stage" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
