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
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { UserSelect } from "../user/UserSelect";
import { AffiliateStat } from "../api/affiliateStat/AffiliateStat";
import { AffiliateStatCreateInput } from "../api/affiliateStat/AffiliateStatCreateInput";

const INITIAL_VALUES = {} as AffiliateStatCreateInput;

export const CreateAffiliateStat = (): React.ReactElement => {
  useBreadcrumbs("/affiliate-stats/new", "Create Affiliate Stats");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    AffiliateStat,
    AxiosError,
    AffiliateStatCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/affiliate-stats", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/affiliate-stats"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: AffiliateStatCreateInput) => {
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
            <FormHeader title={"Create Affiliate Stats"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="IP" name="ip" />
          </div>
          <div>
            <TextField type="number" step={1} label="Status" name="status" />
          </div>
          <div>
            <TextField
              type="datetime-local"
              label="Status Date"
              name="statusDate"
            />
          </div>
          <div>
            <TextField type="number" step={1} label="Type" name="type" />
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
