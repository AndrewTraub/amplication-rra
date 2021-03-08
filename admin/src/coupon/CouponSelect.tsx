import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Coupon } from "../api/coupon/Coupon";

type Data = Coupon[];

type Props = Omit<SelectFieldProps, "options">;

export const CouponSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/coupons",
    async () => {
      const response = await api.get("/api/coupons");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.coupon && item.coupon.length ? item.coupon : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
