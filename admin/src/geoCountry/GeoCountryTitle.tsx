import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { GeoCountry } from "../api/geoCountry/GeoCountry";

type Props = { id: string };

export const GeoCountryTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    GeoCountry,
    AxiosError,
    [string, string]
  >(["get-/api/geo-countries", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/geo-countries"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/geo-countries"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
