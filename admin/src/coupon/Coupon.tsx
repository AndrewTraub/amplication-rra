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
import { Coupon as TCoupon } from "../api/coupon/Coupon";
import { CouponUpdateInput } from "../api/coupon/CouponUpdateInput";

export const Coupon = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/coupons/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TCoupon,
    AxiosError,
    [string, string]
  >(["get-/api/coupons", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/coupons"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TCoupon, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/coupons"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//coupons");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TCoupon, AxiosError, CouponUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/coupons"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: CouponUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.coupon);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["amount", "coupon", "validFrom", "validTo"]),
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
                title={`${"Coupon"} ${
                  data?.coupon && data?.coupon.length ? data.coupon : data?.id
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
              <TextField type="number" label="Amount" name="amount" />
            </div>
            <div>
              <TextField label="Coupon" name="coupon" />
            </div>
            <div>
              <TextField type="date" label="Valid From" name="validFrom" />
            </div>
            <div>
              <TextField type="date" label="Valid To" name="validTo" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
