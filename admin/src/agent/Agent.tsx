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
import { StateSelect } from "../state/StateSelect";
import { UserSelect } from "../user/UserSelect";
import { Agent as TAgent } from "../api/agent/Agent";
import { AgentUpdateInput } from "../api/agent/AgentUpdateInput";

export const Agent = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/agents/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TAgent,
    AxiosError,
    [string, string]
  >(["get-/api/agents", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/agents"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TAgent, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/agents"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//agents");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TAgent, AxiosError, AgentUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/agents"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: AgentUpdateInput) => {
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
    () =>
      pick(data, [
        "address",
        "endDate",
        "fee",
        "name",
        "payTo",
        "startDate",
        "state",
        "taxId",
        "user",
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
                title={`${"Agent"} ${
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
              <TextField label="Address" name="address" textarea />
            </div>
            <div>
              <TextField type="date" label="End Date" name="endDate" />
            </div>
            <div>
              <TextField type="number" label="Fee" name="fee" />
            </div>
            <div>
              <TextField label="Name" name="name" />
            </div>
            <div>
              <TextField label="Pay To" name="payTo" />
            </div>
            <div>
              <TextField type="date" label="Start Date" name="startDate" />
            </div>
            <div>
              <StateSelect label="State" name="state.id" />
            </div>
            <div>
              <TextField label="Tax ID" name="taxId" />
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
