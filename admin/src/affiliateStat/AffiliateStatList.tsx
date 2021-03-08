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
  TimeSince,
} from "@amplication/design-system";

import { UserTitle } from "../user/UserTitle";
import { AffiliateStat } from "../api/affiliateStat/AffiliateStat";

type Data = AffiliateStat[];

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
    name: "createdAt",
    title: "Created At",
    sortable: false,
  },
  {
    name: "ip",
    title: "IP",
    sortable: false,
  },
  {
    name: "status",
    title: "Status",
    sortable: false,
  },
  {
    name: "statusDate",
    title: "Status Date",
    sortable: false,
  },
  {
    name: "type",
    title: "Type",
    sortable: false,
  },
  {
    name: "updatedAt",
    title: "Updated At",
    sortable: false,
  },
  {
    name: "user",
    title: "User",
    sortable: false,
  },
];

export const AffiliateStatList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/affiliate-stats",
    async () => {
      const response = await api.get("/api/affiliate-stats");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Affiliate Stats"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/affiliate-stats/new"}>
            <Button>Create Affiliate Stats </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: AffiliateStat) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link
                    className="entity-id"
                    to={`${"/affiliate-stats"}/${item.id}`}
                  >
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.ip}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.status}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.statusDate}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.type}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.updatedAt} />
                </DataGridCell>
                <DataGridCell>
                  <UserTitle id={item.user?.id} />
                </DataGridCell>
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
