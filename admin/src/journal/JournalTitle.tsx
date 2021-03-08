import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Journal } from "../api/journal/Journal";

type Props = { id: string };

export const JournalTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Journal,
    AxiosError,
    [string, string]
  >(["get-/api/journals", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/journals"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/journals"}/${id}`} className="entity-id">
      {data?.comment && data?.comment.length ? data.comment : data?.id}
    </Link>
  );
};
