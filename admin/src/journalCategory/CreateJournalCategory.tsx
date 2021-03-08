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
  SelectField,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { JournalCategory } from "../api/journalCategory/JournalCategory";
import { JournalCategoryCreateInput } from "../api/journalCategory/JournalCategoryCreateInput";

const INITIAL_VALUES = {} as JournalCategoryCreateInput;

export const CreateJournalCategory = (): React.ReactElement => {
  useBreadcrumbs("/journal-categories/new", "Create Journal Category");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    JournalCategory,
    AxiosError,
    JournalCategoryCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/journal-categories", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/journal-categories"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: JournalCategoryCreateInput) => {
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
            <FormHeader title={"Create Journal Category"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
