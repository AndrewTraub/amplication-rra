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
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { UserSelect } from "../user/UserSelect";
import { AffiliateStat as TAffiliateStat } from "../api/affiliateStat/AffiliateStat";
import { AffiliateStatUpdateInput } from "../api/affiliateStat/AffiliateStatUpdateInput";

export const AffiliateStat = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/affiliate-stats/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TAffiliateStat,
    AxiosError,
    [string, string]
  >(["get-/api/affiliate-stats", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/affiliate-stats"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TAffiliateStat, AxiosError>(
    async (data) => {
      const response = await api.delete(
        `${"/api/affiliate-stats"}/${id}`,
        data
      );
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//affiliate-stats");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TAffiliateStat, AxiosError, AffiliateStatUpdateInput>(
    async (data) => {
      const response = await api.patch(`${"/api/affiliate-stats"}/${id}`, data);
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: AffiliateStatUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.ip);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["ip", "status", "statusDate", "type", "user"]),
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
                title={`${"Affiliate Stats"} ${
                  data?.ip && data?.ip.length ? data.ip : data?.id
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
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
