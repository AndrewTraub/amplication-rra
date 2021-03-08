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
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { UserSelect } from "../user/UserSelect";
import { Log as TLog } from "../api/log/Log";
import { LogUpdateInput } from "../api/log/LogUpdateInput";

export const Log = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/logs/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TLog,
    AxiosError,
    [string, string]
  >(["get-/api/logs", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/logs"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TLog, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/logs"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//logs");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TLog, AxiosError, LogUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/logs"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: LogUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.category);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["category", "entry", "table", "user"]),
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
                title={`${"Log"} ${
                  data?.category && data?.category.length
                    ? data.category
                    : data?.id
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
              <TextField label="Category" name="category" />
            </div>
            <div>
              <TextField label="Entry" name="entry" />
            </div>
            <div>
              <TextField label="Table" name="table" />
            </div>
            <div>
              <UserSelect label="User" name="user.id" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
