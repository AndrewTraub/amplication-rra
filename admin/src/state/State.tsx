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
  ToggleField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { State as TState } from "../api/state/State";
import { StateUpdateInput } from "../api/state/StateUpdateInput";

export const State = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/states/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TState,
    AxiosError,
    [string, string]
  >(["get-/api/states", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/states"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TState, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/states"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//states");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TState, AxiosError, StateUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/states"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: StateUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.sosFax);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () =>
      pick(data, [
        "annualFee",
        "autoFax",
        "sosFax",
        "sosPhone",
        "state",
        "withdrawalFee",
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
                title={`${"State"} ${
                  data?.sosFax && data?.sosFax.length ? data.sosFax : data?.id
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
              <TextField type="number" label="Annual Fee" name="annualFee" />
            </div>
            <div>
              <ToggleField label="Auto Fax" name="autoFax" />
            </div>
            <div>
              <TextField label="SOS Fax" name="sosFax" />
            </div>
            <div>
              <TextField label="SOS Phone" name="sosPhone" />
            </div>
            <div>
              <TextField label="State" name="state" />
            </div>
            <div>
              <TextField
                type="number"
                label="Withdrawal Fee"
                name="withdrawalFee"
              />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
