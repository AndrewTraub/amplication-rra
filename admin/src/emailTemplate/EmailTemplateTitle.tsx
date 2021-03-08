import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { EmailTemplate } from "../api/emailTemplate/EmailTemplate";

type Props = { id: string };

export const EmailTemplateTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    EmailTemplate,
    AxiosError,
    [string, string]
  >(["get-/api/email-templates", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/email-templates"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/email-templates"}/${id}`} className="entity-id">
      {data?.title && data?.title.length ? data.title : data?.id}
    </Link>
  );
};
