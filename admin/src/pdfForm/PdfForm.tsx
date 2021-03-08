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
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { StateSelect } from "../state/StateSelect";
import { PdfForm as TPdfForm } from "../api/pdfForm/PdfForm";
import { PdfFormUpdateInput } from "../api/pdfForm/PdfFormUpdateInput";

export const PdfForm = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/pdf-forms/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TPdfForm,
    AxiosError,
    [string, string]
  >(["get-/api/pdf-forms", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/pdf-forms"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TPdfForm, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/pdf-forms"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//pdf-forms");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TPdfForm, AxiosError, PdfFormUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/pdf-forms"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: PdfFormUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.provatefilename);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () =>
      pick(data, [
        "mustAcceptRisk",
        "privateDescription",
        "provatefilename",
        "public",
        "publicDescription",
        "publicName",
        "state",
        "useRegistrationDate",
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
                title={`${"PDF Form"} ${
                  data?.provatefilename && data?.provatefilename.length
                    ? data.provatefilename
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
              <ToggleField label="Must Accept Risk" name="mustAcceptRisk" />
            </div>
            <div>
              <TextField
                label="Private Description"
                name="privateDescription"
                textarea
              />
            </div>
            <div>
              <TextField label="Private Filename" name="provatefilename" />
            </div>
            <div>
              <ToggleField label="Public" name="public" />
            </div>
            <div>
              <TextField
                label="Public Description"
                name="publicDescription"
                textarea
              />
            </div>
            <div>
              <TextField label="Public Name" name="publicName" />
            </div>
            <div>
              <StateSelect label="State" name="state.id" />
            </div>
            <div>
              <ToggleField
                label="Use Registration Date"
                name="useRegistrationDate"
              />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
