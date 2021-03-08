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
import { StateSelect } from "../state/StateSelect";
import { UserSelect } from "../user/UserSelect";
import { Agent } from "../api/agent/Agent";
import { AgentCreateInput } from "../api/agent/AgentCreateInput";

const INITIAL_VALUES = {} as AgentCreateInput;

export const CreateAgent = (): React.ReactElement => {
  useBreadcrumbs("/agents/new", "Create Agent");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Agent,
    AxiosError,
    AgentCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/agents", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/agents"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: AgentCreateInput) => {
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
            <FormHeader title={"Create Agent"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
