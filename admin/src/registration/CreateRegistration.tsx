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
  SelectField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { CompanySelect } from "../company/CompanySelect";
import { Registration } from "../api/registration/Registration";
import { RegistrationCreateInput } from "../api/registration/RegistrationCreateInput";

const INITIAL_VALUES = {} as RegistrationCreateInput;

export const CreateRegistration = (): React.ReactElement => {
  useBreadcrumbs("/registrations/new", "Create Registration");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Registration,
    AxiosError,
    RegistrationCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/registrations", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/registrations"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: RegistrationCreateInput) => {
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
            <FormHeader title={"Create Registration"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
