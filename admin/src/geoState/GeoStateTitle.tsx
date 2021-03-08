import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { GeoState } from "../api/geoState/GeoState";

type Props = { id: string };

export const GeoStateTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    GeoState,
    AxiosError,
    [string, string]
  >(["get-/api/geo-states", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/geo-states"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/geo-states"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
