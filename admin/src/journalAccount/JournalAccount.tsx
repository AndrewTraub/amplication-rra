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
  SelectField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { JournalAccount as TJournalAccount } from "../api/journalAccount/JournalAccount";
import { JournalAccountUpdateInput } from "../api/journalAccount/JournalAccountUpdateInput";

export const JournalAccount = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/journal-accounts/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TJournalAccount,
    AxiosError,
    [string, string]
  >(["get-/api/journal-accounts", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/journal-accounts"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TJournalAccount, AxiosError>(
    async (data) => {
      const response = await api.delete(
        `${"/api/journal-accounts"}/${id}`,
        data
      );
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//journal-accounts");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TJournalAccount, AxiosError, JournalAccountUpdateInput>(
    async (data) => {
      const response = await api.patch(
        `${"/api/journal-accounts"}/${id}`,
        data
      );
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: JournalAccountUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.accountNumber);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["accountNumber", "assettype", "balance", "description"]),
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
                title={`${"Journal Account"} ${
                  data?.accountNumber && data?.accountNumber.length
                    ? data.accountNumber
                    : data?.id
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
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
