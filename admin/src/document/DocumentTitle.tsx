import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Document } from "../api/document/Document";

type Props = { id: string };

export const DocumentTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Document,
    AxiosError,
    [string, string]
  >(["get-/api/documents", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/documents"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/documents"}/${id}`} className="entity-id">
      {data?.title && data?.title.length ? data.title : data?.id}
    </Link>
  );
};
