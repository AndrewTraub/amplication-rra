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
import { GeoState } from "../api/geoState/GeoState";
import { GeoStateCreateInput } from "../api/geoState/GeoStateCreateInput";

const INITIAL_VALUES = {} as GeoStateCreateInput;

export const CreateGeoState = (): React.ReactElement => {
  useBreadcrumbs("/geo-states/new", "Create Geo State");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    GeoState,
    AxiosError,
    GeoStateCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/geo-states", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/geo-states"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: GeoStateCreateInput) => {
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
            <FormHeader title={"Create Geo State"}>
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
            <TextField label="Name" name="name" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
