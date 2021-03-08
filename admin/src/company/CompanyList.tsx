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
import { Company } from "../api/company/Company";

type Data = Company[];

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
    name: "address",
    title: "Address",
    sortable: false,
  },
  {
    name: "address2",
    title: "Address2",
    sortable: false,
  },
  {
    name: "city",
    title: "City",
    sortable: false,
  },
  {
    name: "country",
    title: "Country",
    sortable: false,
  },
  {
    name: "createdAt",
    title: "Created At",
    sortable: false,
  },
  {
    name: "entityType",
    title: "Entity Type",
    sortable: false,
  },
  {
    name: "federalIdNumber",
    title: "Federal ID Number",
    sortable: false,
  },
  {
    name: "name",
    title: "Name",
    sortable: false,
  },
  {
    name: "notes",
    title: "Notes",
    sortable: false,
  },
  {
    name: "raiUuid",
    title: "RAI UUID",
    sortable: false,
  },
  {
    name: "state",
    title: "State",
    sortable: false,
  },
  {
    name: "updatedAt",
    title: "Updated At",
    sortable: false,
  },
  {
    name: "userId",
    title: "User ID",
    sortable: false,
  },
  {
    name: "zip",
    title: "Zip",
    sortable: false,
  },
];

export const CompanyList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/companies",
    async () => {
      const response = await api.get("/api/companies");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Companies"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/companies/new"}>
            <Button>Create Company </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: Company) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link className="entity-id" to={`${"/companies"}/${item.id}`}>
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <>{item.address}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.address2}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.city}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.country}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.entityType}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.federalIdNumber}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.name}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.notes}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.raiUuid}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.state}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.updatedAt} />
                </DataGridCell>
                <DataGridCell>
                  <UserTitle id={item.userId?.id} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.zip}</>
                </DataGridCell>
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
