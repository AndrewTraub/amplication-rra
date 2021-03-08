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

import { GeoCountry } from "../api/geoCountry/GeoCountry";

type Data = GeoCountry[];

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
];

export const GeoCountryList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/geo-countries",
    async () => {
      const response = await api.get("/api/geo-countries");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Geo Countries"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/geo-countries/new"}>
            <Button>Create Geo Country </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: GeoCountry) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link
                    className="entity-id"
                    to={`${"/geo-countries"}/${item.id}`}
                  >
                    {item.id}
                  </Link>
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
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
