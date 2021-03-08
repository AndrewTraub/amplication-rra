import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { State } from "../api/state/State";

type Props = { id: string };

export const StateTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    State,
    AxiosError,
    [string, string]
  >(["get-/api/states", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/states"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/states"}/${id}`} className="entity-id">
      {data?.sosFax && data?.sosFax.length ? data.sosFax : data?.id}
    </Link>
  );
};
