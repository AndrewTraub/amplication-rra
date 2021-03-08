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
  ToggleField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { JournalAccountSelect } from "../journalAccount/JournalAccountSelect";
import { AgentSelect } from "../agent/AgentSelect";
import { JournalCategorySelect } from "../journalCategory/JournalCategorySelect";
import { RegistrationSelect } from "../registration/RegistrationSelect";
import { UserSelect } from "../user/UserSelect";
import { Journal } from "../api/journal/Journal";
import { JournalCreateInput } from "../api/journal/JournalCreateInput";

const INITIAL_VALUES = {} as JournalCreateInput;

export const CreateJournal = (): React.ReactElement => {
  useBreadcrumbs("/journals/new", "Create Journal");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Journal,
    AxiosError,
    JournalCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/journals", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/journals"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: JournalCreateInput) => {
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
            <FormHeader title={"Create Journal"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <JournalAccountSelect label="Account" name="account.id" />
          </div>
          <div>
            <AgentSelect label="Agent" name="agent.id" />
          </div>
          <div>
            <TextField type="number" label="Amount" name="amount" />
          </div>
          <div>
            <JournalCategorySelect label="Category" name="category.id" />
          </div>
          <div>
            <TextField label="Comment" name="comment" />
          </div>
          <div>
            <SelectField
              label="DC"
              name="dc"
              options={[
                { label: "D", value: "D" },
                { label: "C", value: "C" },
              ]}
            />
          </div>
          <div>
            <TextField label="Description" name="description" textarea />
          </div>
          <div>
            <SelectField
              label="Journal Type"
              name="journaltype"
              options={[
                { label: "SJ", value: "Sj" },
                { label: "AP", value: "Ap" },
              ]}
            />
          </div>
          <div>
            <TextField
              type="datetime-local"
              label="Post Date"
              name="postDate"
            />
          </div>
          <div>
            <ToggleField label="Posted" name="posted" />
          </div>
          <div>
            <RegistrationSelect label="Registration" name="registration.id" />
          </div>
          <div>
            <TextField label="Source" name="source" />
          </div>
          <div>
            <TextField
              type="datetime-local"
              label="Transaction Date"
              name="transactionDate"
            />
          </div>
          <div>
            <TextField label="Transaction ID" name="transactionId" />
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
