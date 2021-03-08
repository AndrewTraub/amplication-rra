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
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { UserSelect } from "../user/UserSelect";
import { Log } from "../api/log/Log";
import { LogCreateInput } from "../api/log/LogCreateInput";

const INITIAL_VALUES = {} as LogCreateInput;

export const CreateLog = (): React.ReactElement => {
  useBreadcrumbs("/logs/new", "Create Log");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Log,
    AxiosError,
    LogCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/logs", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/logs"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: LogCreateInput) => {
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
            <FormHeader title={"Create Log"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
