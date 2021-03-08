import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { EmailQueue } from "../api/emailQueue/EmailQueue";

type Props = { id: string };

export const EmailQueueTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    EmailQueue,
    AxiosError,
    [string, string]
  >(["get-/api/email-queues", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/email-queues"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/email-queues"}/${id}`} className="entity-id">
      {data?.subject && data?.subject.length ? data.subject : data?.id}
    </Link>
  );
};
