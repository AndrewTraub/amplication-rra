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

import { JournalAccount } from "../api/journalAccount/JournalAccount";

type Data = JournalAccount[];

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
    name: "accountNumber",
    title: "Account Number",
    sortable: false,
  },
  {
    name: "assettype",
    title: "Asset Type",
    sortable: false,
  },
  {
    name: "balance",
    title: "Balance",
    sortable: false,
  },
  {
    name: "createdAt",
    title: "Created At",
    sortable: false,
  },
  {
    name: "description",
    title: "Description",
    sortable: false,
  },
  {
    name: "updatedAt",
    title: "Updated At",
    sortable: false,
  },
];

export const JournalAccountList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/journal-accounts",
    async () => {
      const response = await api.get("/api/journal-accounts");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Journal Accounts"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/journal-accounts/new"}>
            <Button>Create Journal Account </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: JournalAccount) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link
                    className="entity-id"
                    to={`${"/journal-accounts"}/${item.id}`}
                  >
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <>{item.accountNumber}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.assettype}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.balance}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.description}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.updatedAt} />
                </DataGridCell>
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
