import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { JournalCategory } from "../api/journalCategory/JournalCategory";

type Props = { id: string };

export const JournalCategoryTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    JournalCategory,
    AxiosError,
    [string, string]
  >(["get-/api/journal-categories", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/journal-categories"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/journal-categories"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
