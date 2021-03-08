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
  SelectField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { JournalAccount } from "../api/journalAccount/JournalAccount";
import { JournalAccountCreateInput } from "../api/journalAccount/JournalAccountCreateInput";

const INITIAL_VALUES = {} as JournalAccountCreateInput;

export const CreateJournalAccount = (): React.ReactElement => {
  useBreadcrumbs("/journal-accounts/new", "Create Journal Account");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    JournalAccount,
    AxiosError,
    JournalAccountCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/journal-accounts", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/journal-accounts"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: JournalAccountCreateInput) => {
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
            <FormHeader title={"Create Journal Account"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Account Number" name="accountNumber" />
          </div>
          <div>
            <SelectField
              label="Asset Type"
              name="assettype"
              options={[
                { label: "Asset", value: "Asset" },
                { label: "Liability", value: "Liability" },
                { label: "Equity", value: "Equity" },
                { label: "Receivable", value: "Receivable" },
                { label: "Expense", value: "Expense" },
              ]}
            />
          </div>
          <div>
            <TextField type="number" label="Balance" name="balance" />
          </div>
          <div>
            <TextField label="Description" name="description" textarea />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
