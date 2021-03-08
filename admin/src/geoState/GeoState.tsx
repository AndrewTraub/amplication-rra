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
import { GeoCountrySelect } from "../geoCountry/GeoCountrySelect";
import { GeoState as TGeoState } from "../api/geoState/GeoState";
import { GeoStateUpdateInput } from "../api/geoState/GeoStateUpdateInput";

export const GeoState = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/geo-states/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TGeoState,
    AxiosError,
    [string, string]
  >(["get-/api/geo-states", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/geo-states"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TGeoState, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/geo-states"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//geo-states");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TGeoState, AxiosError, GeoStateUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/geo-states"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: GeoStateUpdateInput) => {
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

  const initialValues = React.useMemo(() => pick(data, ["country", "name"]), [
    data,
  ]);

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
                title={`${"Geo State"} ${
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
              <GeoCountrySelect label="Country" name="country.id" />
            </div>
            <div>
              <TextField label="Name" name="name" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
