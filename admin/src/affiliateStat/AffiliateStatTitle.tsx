import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { AffiliateStat } from "../api/affiliateStat/AffiliateStat";

type Props = { id: string };

export const AffiliateStatTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    AffiliateStat,
    AxiosError,
    [string, string]
  >(["get-/api/affiliate-stats", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/affiliate-stats"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/affiliate-stats"}/${id}`} className="entity-id">
      {data?.ip && data?.ip.length ? data.ip : data?.id}
    </Link>
  );
};
