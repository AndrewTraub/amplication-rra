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
  SelectField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Coupon } from "../api/coupon/Coupon";
import { CouponCreateInput } from "../api/coupon/CouponCreateInput";

const INITIAL_VALUES = {} as CouponCreateInput;

export const CreateCoupon = (): React.ReactElement => {
  useBreadcrumbs("/coupons/new", "Create Coupon");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Coupon,
    AxiosError,
    CouponCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/coupons", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/coupons"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: CouponCreateInput) => {
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
            <FormHeader title={"Create Coupon"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField type="number" label="Amount" name="amount" />
          </div>
          <div>
            <TextField label="Coupon" name="coupon" />
          </div>
          <div>
            <SelectField
              label="MinTerm"
              name="minTerm"
              options={[
                { label: "Month", value: "Month" },
                { label: "Year", value: "Year" },
              ]}
            />
          </div>
          <div>
            <TextField type="date" label="Valid From" name="validFrom" />
          </div>
          <div>
            <TextField type="date" label="Valid To" name="validTo" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
