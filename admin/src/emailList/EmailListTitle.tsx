import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { EmailList } from "../api/emailList/EmailList";

type Props = { id: string };

export const EmailListTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    EmailList,
    AxiosError,
    [string, string]
  >(["get-/api/email-lists", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/email-lists"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/email-lists"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
