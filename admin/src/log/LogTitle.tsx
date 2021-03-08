import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Log } from "../api/log/Log";

type Props = { id: string };

export const LogTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Log,
    AxiosError,
    [string, string]
  >(["get-/api/logs", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/logs"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/logs"}/${id}`} className="entity-id">
      {data?.category && data?.category.length ? data.category : data?.id}
    </Link>
  );
};
