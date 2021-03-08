import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Coupon } from "../api/coupon/Coupon";

type Props = { id: string };

export const CouponTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Coupon,
    AxiosError,
    [string, string]
  >(["get-/api/coupons", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/coupons"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/coupons"}/${id}`} className="entity-id">
      {data?.coupon && data?.coupon.length ? data.coupon : data?.id}
    </Link>
  );
};
