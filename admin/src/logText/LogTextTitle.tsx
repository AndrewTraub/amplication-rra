import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { LogText } from "../api/logText/LogText";

type Props = { id: string };

export const LogTextTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    LogText,
    AxiosError,
    [string, string]
  >(["get-/api/log-texts", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/log-texts"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/log-texts"}/${id}`} className="entity-id">
      {data?.message && data?.message.length ? data.message : data?.id}
    </Link>
  );
};
