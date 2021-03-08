import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { LogEmail } from "../api/logEmail/LogEmail";

type Props = { id: string };

export const LogEmailTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    LogEmail,
    AxiosError,
    [string, string]
  >(["get-/api/log-emails", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/log-emails"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/log-emails"}/${id}`} className="entity-id">
      {data?.emailEvent && data?.emailEvent.length ? data.emailEvent : data?.id}
    </Link>
  );
};
