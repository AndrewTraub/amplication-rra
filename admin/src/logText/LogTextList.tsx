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

import { NotificationTitle } from "../notification/NotificationTitle";
import { RegistrationTitle } from "../registration/RegistrationTitle";
import { UserTitle } from "../user/UserTitle";
import { LogText } from "../api/logText/LogText";

type Data = LogText[];

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
    name: "message",
    title: "Message",
    sortable: false,
  },
  {
    name: "notification",
    title: "Notification",
    sortable: false,
  },
  {
    name: "registration",
    title: "Registration",
    sortable: false,
  },
  {
    name: "response",
    title: "Response",
    sortable: false,
  },
  {
    name: "sent",
    title: "Sent",
    sortable: false,
  },
  {
    name: "sentBy",
    title: "Sent By",
    sortable: false,
  },
  {
    name: "sentToNumber",
    title: "Sent To Number",
    sortable: false,
  },
  {
    name: "smsTriggerReason",
    title: "SMS Trigger Reason",
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

export const LogTextList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/log-texts",
    async () => {
      const response = await api.get("/api/log-texts");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Log SMS"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/log-texts/new"}>
            <Button>Create Log SMS </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: LogText) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link className="entity-id" to={`${"/log-texts"}/${item.id}`}>
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.message}</>
                </DataGridCell>
                <DataGridCell>
                  <NotificationTitle id={item.notification?.id} />
                </DataGridCell>
                <DataGridCell>
                  <RegistrationTitle id={item.registration?.id} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.response}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.sent}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.sentBy}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.sentToNumber}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.smsTriggerReason}</>
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
