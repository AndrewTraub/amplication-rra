import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { JournalAccount } from "../api/journalAccount/JournalAccount";

type Props = { id: string };

export const JournalAccountTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    JournalAccount,
    AxiosError,
    [string, string]
  >(["get-/api/journal-accounts", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/journal-accounts"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/journal-accounts"}/${id}`} className="entity-id">
      {data?.accountNumber && data?.accountNumber.length
        ? data.accountNumber
        : data?.id}
    </Link>
  );
};
