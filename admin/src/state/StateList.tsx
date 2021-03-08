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
  CircleIcon,
  EnumCircleIconStyle,
  TimeSince,
} from "@amplication/design-system";

import { State } from "../api/state/State";

type Data = State[];

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
    name: "annualFee",
    title: "Annual Fee",
    sortable: false,
  },
  {
    name: "autoFax",
    title: "Auto Fax",
    sortable: false,
  },
  {
    name: "createdAt",
    title: "Created At",
    sortable: false,
  },
  {
    name: "sosFax",
    title: "SOS Fax",
    sortable: false,
  },
  {
    name: "sosPhone",
    title: "SOS Phone",
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
    name: "withdrawalFee",
    title: "Withdrawal Fee",
    sortable: false,
  },
];

export const StateList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/states",
    async () => {
      const response = await api.get("/api/states");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"States"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/states/new"}>
            <Button>Create State </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: State) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link className="entity-id" to={`${"/states"}/${item.id}`}>
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <>{item.annualFee}</>
                </DataGridCell>
                <DataGridCell>
                  <>
                    {item.autoFax && (
                      <CircleIcon
                        icon="check"
                        style={EnumCircleIconStyle.positive}
                      />
                    )}
                  </>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.sosFax}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.sosPhone}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.state}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.updatedAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.withdrawalFee}</>
                </DataGridCell>
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
