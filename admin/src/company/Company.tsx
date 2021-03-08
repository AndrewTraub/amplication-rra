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
import { Company as TCompany } from "../api/company/Company";
import { CompanyUpdateInput } from "../api/company/CompanyUpdateInput";

export const Company = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/companies/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TCompany,
    AxiosError,
    [string, string]
  >(["get-/api/companies", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/companies"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TCompany, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/companies"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//companies");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TCompany, AxiosError, CompanyUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/companies"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: CompanyUpdateInput) => {
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
        "address2",
        "city",
        "country",
        "entityType",
        "federalIdNumber",
        "name",
        "notes",
        "raiUuid",
        "state",
        "userId",
        "zip",
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
                title={`${"Company"} ${
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
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
