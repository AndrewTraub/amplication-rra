import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { GeoCity } from "../api/geoCity/GeoCity";

type Props = { id: string };

export const GeoCityTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    GeoCity,
    AxiosError,
    [string, string]
  >(["get-/api/geo-cities", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/geo-cities"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/geo-cities"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
