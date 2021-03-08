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
import { GeoCountry as TGeoCountry } from "../api/geoCountry/GeoCountry";
import { GeoCountryUpdateInput } from "../api/geoCountry/GeoCountryUpdateInput";

export const GeoCountry = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/geo-countries/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TGeoCountry,
    AxiosError,
    [string, string]
  >(["get-/api/geo-countries", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/geo-countries"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TGeoCountry, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/geo-countries"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//geo-countries");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TGeoCountry, AxiosError, GeoCountryUpdateInput>(
    async (data) => {
      const response = await api.patch(`${"/api/geo-countries"}/${id}`, data);
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: GeoCountryUpdateInput) => {
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
    () => pick(data, ["latitude", "longitude", "name"]),
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
                title={`${"Geo Country"} ${
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
              <TextField type="number" label="Latitude" name="latitude" />
            </div>
            <div>
              <TextField label="Longitude" name="longitude" />
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
