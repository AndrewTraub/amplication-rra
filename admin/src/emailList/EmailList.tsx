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
import { EmailList as TEmailList } from "../api/emailList/EmailList";
import { EmailListUpdateInput } from "../api/emailList/EmailListUpdateInput";

export const EmailList = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/email-lists/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TEmailList,
    AxiosError,
    [string, string]
  >(["get-/api/email-lists", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/email-lists"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TEmailList, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/email-lists"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//email-lists");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TEmailList, AxiosError, EmailListUpdateInput>(
    async (data) => {
      const response = await api.patch(`${"/api/email-lists"}/${id}`, data);
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: EmailListUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.name);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["active", "description", "name", "stage"]),
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
                title={`${"Email List"} ${
                  data?.name && data?.name.length ? data.name : data?.id
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
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
