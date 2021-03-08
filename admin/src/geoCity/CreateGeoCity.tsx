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
import { GeoCountrySelect } from "../geoCountry/GeoCountrySelect";
import { GeoStateSelect } from "../geoState/GeoStateSelect";
import { GeoCity } from "../api/geoCity/GeoCity";
import { GeoCityCreateInput } from "../api/geoCity/GeoCityCreateInput";

const INITIAL_VALUES = {} as GeoCityCreateInput;

export const CreateGeoCity = (): React.ReactElement => {
  useBreadcrumbs("/geo-cities/new", "Create Geo City");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    GeoCity,
    AxiosError,
    GeoCityCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/geo-cities", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/geo-cities"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: GeoCityCreateInput) => {
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
            <FormHeader title={"Create Geo City"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
