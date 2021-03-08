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
import { EmailListSelect } from "../emailList/EmailListSelect";
import { EmailTemplate as TEmailTemplate } from "../api/emailTemplate/EmailTemplate";
import { EmailTemplateUpdateInput } from "../api/emailTemplate/EmailTemplateUpdateInput";

export const EmailTemplate = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/email-templates/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TEmailTemplate,
    AxiosError,
    [string, string]
  >(["get-/api/email-templates", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/email-templates"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TEmailTemplate, AxiosError>(
    async (data) => {
      const response = await api.delete(
        `${"/api/email-templates"}/${id}`,
        data
      );
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//email-templates");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TEmailTemplate, AxiosError, EmailTemplateUpdateInput>(
    async (data) => {
      const response = await api.patch(`${"/api/email-templates"}/${id}`, data);
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: EmailTemplateUpdateInput) => {
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
    () =>
      pick(data, [
        "active",
        "body",
        "delay",
        "emailList",
        "sequenceNumber",
        "title",
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
                title={`${"Email Template"} ${
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
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
