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
import { State } from "../api/state/State";
import { StateCreateInput } from "../api/state/StateCreateInput";

const INITIAL_VALUES = {} as StateCreateInput;

export const CreateState = (): React.ReactElement => {
  useBreadcrumbs("/states/new", "Create State");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    State,
    AxiosError,
    StateCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/states", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/states"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: StateCreateInput) => {
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
            <FormHeader title={"Create State"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
