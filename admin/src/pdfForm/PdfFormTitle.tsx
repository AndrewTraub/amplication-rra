import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { PdfForm } from "../api/pdfForm/PdfForm";

type Props = { id: string };

export const PdfFormTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    PdfForm,
    AxiosError,
    [string, string]
  >(["get-/api/pdf-forms", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/pdf-forms"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/pdf-forms"}/${id}`} className="entity-id">
      {data?.provatefilename && data?.provatefilename.length
        ? data.provatefilename
        : data?.id}
    </Link>
  );
};
