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
  SelectField,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { JournalCategory as TJournalCategory } from "../api/journalCategory/JournalCategory";
import { JournalCategoryUpdateInput } from "../api/journalCategory/JournalCategoryUpdateInput";

export const JournalCategory = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/journal-categories/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TJournalCategory,
    AxiosError,
    [string, string]
  >(["get-/api/journal-categories", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/journal-categories"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TJournalCategory, AxiosError>(
    async (data) => {
      const response = await api.delete(
        `${"/api/journal-categories"}/${id}`,
        data
      );
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//journal-categories");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TJournalCategory, AxiosError, JournalCategoryUpdateInput>(
    async (data) => {
      const response = await api.patch(
        `${"/api/journal-categories"}/${id}`,
        data
      );
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: JournalCategoryUpdateInput) => {
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
    () => pick(data, ["incomeorexpense", "name", "sort"]),
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
                title={`${"Journal Category"} ${
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
              <SelectField
                label="Income or Expense"
                name="incomeorexpense"
                options={[
                  { label: "Income", value: "Income" },
                  { label: "Expense", value: "Expense" },
                ]}
              />
            </div>
            <div>
              <TextField label="Name" name="name" />
            </div>
            <div>
              <TextField type="number" step={1} label="Sort" name="sort" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
