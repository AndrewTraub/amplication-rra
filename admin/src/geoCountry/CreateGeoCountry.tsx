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
import { GeoCountry } from "../api/geoCountry/GeoCountry";
import { GeoCountryCreateInput } from "../api/geoCountry/GeoCountryCreateInput";

const INITIAL_VALUES = {} as GeoCountryCreateInput;

export const CreateGeoCountry = (): React.ReactElement => {
  useBreadcrumbs("/geo-countries/new", "Create Geo Country");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    GeoCountry,
    AxiosError,
    GeoCountryCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/geo-countries", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/geo-countries"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: GeoCountryCreateInput) => {
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
            <FormHeader title={"Create Geo Country"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
