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
import { EmailListSelect } from "../emailList/EmailListSelect";
import { EmailTemplate } from "../api/emailTemplate/EmailTemplate";
import { EmailTemplateCreateInput } from "../api/emailTemplate/EmailTemplateCreateInput";

const INITIAL_VALUES = {} as EmailTemplateCreateInput;

export const CreateEmailTemplate = (): React.ReactElement => {
  useBreadcrumbs("/email-templates/new", "Create Email Template");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    EmailTemplate,
    AxiosError,
    EmailTemplateCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/email-templates", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/email-templates"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: EmailTemplateCreateInput) => {
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
            <FormHeader title={"Create Email Template"}>
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
            <TextField type="number" step={1} label="Delay" name="delay" />
          </div>
          <div>
            <EmailListSelect label="Email List" name="emailList.id" />
          </div>
          <div>
            <TextField
              type="number"
              step={1}
              label="Sequence Number"
              name="sequenceNumber"
            />
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
