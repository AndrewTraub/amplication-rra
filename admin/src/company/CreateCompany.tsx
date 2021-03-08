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
import { Company } from "../api/company/Company";
import { CompanyCreateInput } from "../api/company/CompanyCreateInput";

const INITIAL_VALUES = {} as CompanyCreateInput;

export const CreateCompany = (): React.ReactElement => {
  useBreadcrumbs("/companies/new", "Create Company");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Company,
    AxiosError,
    CompanyCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/companies", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/companies"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: CompanyCreateInput) => {
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
            <FormHeader title={"Create Company"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Address" name="address" />
          </div>
          <div>
            <TextField label="Address2" name="address2" />
          </div>
          <div>
            <TextField label="City" name="city" />
          </div>
          <div>
            <TextField label="Country" name="country" />
          </div>
          <div>
            <TextField
              type="number"
              step={1}
              label="Entity Type"
              name="entityType"
            />
          </div>
          <div>
            <TextField label="Federal ID Number" name="federalIdNumber" />
          </div>
          <div>
            <TextField label="Name" name="name" />
          </div>
          <div>
            <TextField label="Notes" name="notes" textarea />
          </div>
          <div>
            <TextField label="RAI UUID" name="raiUuid" />
          </div>
          <div>
            <TextField label="State" name="state" />
          </div>
          <div>
            <UserSelect label="User ID" name="userId.id" />
          </div>
          <div>
            <TextField label="Zip" name="zip" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
