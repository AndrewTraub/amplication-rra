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

import { StateTitle } from "../state/StateTitle";
import { UserTitle } from "../user/UserTitle";
import { Agent } from "../api/agent/Agent";

type Data = Agent[];

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
    name: "createdAt",
    title: "Created At",
    sortable: false,
  },
  {
    name: "endDate",
    title: "End Date",
    sortable: false,
  },
  {
    name: "fee",
    title: "Fee",
    sortable: false,
  },
  {
    name: "name",
    title: "Name",
    sortable: false,
  },
  {
    name: "payTo",
    title: "Pay To",
    sortable: false,
  },
  {
    name: "startDate",
    title: "Start Date",
    sortable: false,
  },
  {
    name: "state",
    title: "State",
    sortable: false,
  },
  {
    name: "taxId",
    title: "Tax ID",
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

export const AgentList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/agents",
    async () => {
      const response = await api.get("/api/agents");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Agents"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/agents/new"}>
            <Button>Create Agent </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: Agent) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link className="entity-id" to={`${"/agents"}/${item.id}`}>
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <>{item.address}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.endDate}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.fee}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.name}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.payTo}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.startDate}</>
                </DataGridCell>
                <DataGridCell>
                  <StateTitle id={item.state?.id} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.taxId}</>
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
