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
import { GeoStateSelect } from "../geoState/GeoStateSelect";
import { GeoCity as TGeoCity } from "../api/geoCity/GeoCity";
import { GeoCityUpdateInput } from "../api/geoCity/GeoCityUpdateInput";

export const GeoCity = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/geo-cities/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TGeoCity,
    AxiosError,
    [string, string]
  >(["get-/api/geo-cities", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/geo-cities"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TGeoCity, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/geo-cities"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//geo-cities");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TGeoCity, AxiosError, GeoCityUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/geo-cities"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: GeoCityUpdateInput) => {
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
    () => pick(data, ["country", "latitude", "longitude", "name", "state"]),
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
                title={`${"Geo City"} ${
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
              <TextField type="number" label="Latitude" name="latitude" />
            </div>
            <div>
              <TextField type="number" label="Longitude" name="longitude" />
            </div>
            <div>
              <TextField label="Name" name="name" />
            </div>
            <div>
              <GeoStateSelect label="State" name="state.id" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
