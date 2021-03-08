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
  ToggleField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { JournalAccountSelect } from "../journalAccount/JournalAccountSelect";
import { AgentSelect } from "../agent/AgentSelect";
import { JournalCategorySelect } from "../journalCategory/JournalCategorySelect";
import { RegistrationSelect } from "../registration/RegistrationSelect";
import { UserSelect } from "../user/UserSelect";
import { Journal as TJournal } from "../api/journal/Journal";
import { JournalUpdateInput } from "../api/journal/JournalUpdateInput";

export const Journal = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/journals/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TJournal,
    AxiosError,
    [string, string]
  >(["get-/api/journals", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/journals"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TJournal, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/journals"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//journals");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TJournal, AxiosError, JournalUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/journals"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: JournalUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.comment);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () =>
      pick(data, [
        "account",
        "agent",
        "amount",
        "category",
        "comment",
        "dc",
        "description",
        "journaltype",
        "postDate",
        "posted",
        "registration",
        "source",
        "transactionDate",
        "transactionId",
        "user",
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
                title={`${"Journal"} ${
                  data?.comment && data?.comment.length
                    ? data.comment
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
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
