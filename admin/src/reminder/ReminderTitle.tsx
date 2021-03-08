import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Reminder } from "../api/reminder/Reminder";

type Props = { id: string };

export const ReminderTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Reminder,
    AxiosError,
    [string, string]
  >(["get-/api/reminders", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/reminders"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/reminders"}/${id}`} className="entity-id">
      {data?.title && data?.title.length ? data.title : data?.id}
    </Link>
  );
};
