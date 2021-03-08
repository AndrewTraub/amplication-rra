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
import { StateSelect } from "../state/StateSelect";
import { Form } from "../api/form/Form";
import { FormCreateInput } from "../api/form/FormCreateInput";

const INITIAL_VALUES = {} as FormCreateInput;

export const CreateForm = (): React.ReactElement => {
  useBreadcrumbs("/forms/new", "Create Form");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Form,
    AxiosError,
    FormCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/forms", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/forms"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: FormCreateInput) => {
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
            <FormHeader title={"Create Form"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <ToggleField label="Must Accept Risk" name="mustAcceptRisk" />
          </div>
          <div>
            <TextField
              label="Private Description"
              name="privateDescription"
              textarea
            />
          </div>
          <div>
            <TextField label="Private Filename" name="provatefilename" />
          </div>
          <div>
            <ToggleField label="Public" name="public" />
          </div>
          <div>
            <TextField
              label="Public Description"
              name="publicDescription"
              textarea
            />
          </div>
          <div>
            <TextField label="Public Name" name="publicName" />
          </div>
          <div>
            <StateSelect label="State" name="state.id" />
          </div>
          <div>
            <ToggleField
              label="Use Registration Date"
              name="useRegistrationDate"
            />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
