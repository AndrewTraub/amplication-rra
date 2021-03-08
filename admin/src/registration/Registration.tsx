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
  SelectField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { CompanySelect } from "../company/CompanySelect";
import { Registration as TRegistration } from "../api/registration/Registration";
import { RegistrationUpdateInput } from "../api/registration/RegistrationUpdateInput";

export const Registration = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/registrations/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TRegistration,
    AxiosError,
    [string, string]
  >(["get-/api/registrations", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/registrations"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TRegistration, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/registrations"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//registrations");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TRegistration, AxiosError, RegistrationUpdateInput>(
    async (data) => {
      const response = await api.patch(`${"/api/registrations"}/${id}`, data);
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: RegistrationUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.dba);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () =>
      pick(data, [
        "automaticRenewal",
        "cancelledDate",
        "companyId",
        "dba",
        "exp",
        "four",
        "merchant",
        "noGracePeriod",
        "period",
        "registeredDate",
        "renewalDate",
        "state",
        "status",
        "subscriptionId",
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
                title={`${"Registration"} ${
                  data?.dba && data?.dba.length ? data.dba : data?.id
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
              <ToggleField label="Automatic Renewal" name="automaticRenewal" />
            </div>
            <div>
              <TextField
                type="datetime-local"
                label="Cancelled Date"
                name="cancelledDate"
              />
            </div>
            <div>
              <CompanySelect label="Company ID" name="companyId.id" />
            </div>
            <div>
              <TextField label="DBA" name="dba" />
            </div>
            <div>
              <TextField label="Exp" name="exp" />
            </div>
            <div>
              <TextField label="Four" name="four" />
            </div>
            <div>
              <SelectField
                label="Merchant"
                name="merchant"
                options={[
                  { label: "AuthorizeNet", value: "AuthorizeNet" },
                  { label: "Paypal", value: "Paypal" },
                  { label: "Stripe", value: "Stripe" },
                ]}
              />
            </div>
            <div>
              <ToggleField label="No Grace Period" name="noGracePeriod" />
            </div>
            <div>
              <SelectField
                label="Period"
                name="period"
                options={[
                  { label: "Month", value: "Month" },
                  { label: "Year", value: "Year" },
                ]}
              />
            </div>
            <div>
              <TextField
                type="datetime-local"
                label="Registered Date"
                name="registeredDate"
              />
            </div>
            <div>
              <TextField type="date" label="Renewal Date" name="renewalDate" />
            </div>
            <div>
              <TextField label="State" name="state" />
            </div>
            <div>
              <SelectField
                label="Status"
                name="status"
                options={[
                  { label: "Unregistered", value: "Unregistered" },
                  { label: "Registered", value: "Registered" },
                  { label: "Overdue", value: "Overdue" },
                  { label: "Cancelled", value: "Cancelled" },
                ]}
              />
            </div>
            <div>
              <TextField label="Subscription ID" name="subscriptionId" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
