import * as React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";

import {
  DataGrid,
  DataField,
  SortData,
  DataGridRow,
  DataGridCell,
  EnumTitleType,
  Button,
  Snackbar,
} from "@amplication/design-system";

import { GeoCountryTitle } from "../geoCountry/GeoCountryTitle";
import { GeoStateTitle } from "../geoState/GeoStateTitle";
import { GeoCity } from "../api/geoCity/GeoCity";

type Data = GeoCity[];

const SORT_DATA: SortData = {
  field: null,
  order: null,
};

const FIELDS: DataField[] = [
  {
    name: "id",
    title: "ID",
    sortable: false,
  },
  {
    name: "country",
    title: "Country",
    sortable: false,
  },
  {
    name: "latitude",
    title: "Latitude",
    sortable: false,
  },
  {
    name: "longitude",
    title: "Longitude",
    sortable: false,
  },
  {
    name: "name",
    title: "Name",
    sortable: false,
  },
  {
    name: "state",
    title: "State",
    sortable: false,
  },
];

export const GeoCityList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/geo-cities",
    async () => {
      const response = await api.get("/api/geo-cities");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Geo Cities"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/geo-cities/new"}>
            <Button>Create Geo City </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: GeoCity) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link
                    className="entity-id"
                    to={`${"/geo-cities"}/${item.id}`}
                  >
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <GeoCountryTitle id={item.country?.id} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.latitude}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.longitude}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.name}</>
                </DataGridCell>
                <DataGridCell>
                  <GeoStateTitle id={item.state?.id} />
                </DataGridCell>
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
