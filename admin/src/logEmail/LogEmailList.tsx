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
import { LogEmail } from "../api/logEmail/LogEmail";

type Data = LogEmail[];

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
    name: "emailEvent",
    title: "Email Event",
    sortable: false,
  },
  {
    name: "emailTo",
    title: "Email To",
    sortable: false,
  },
  {
    name: "messageId",
    title: "Message ID",
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
    name: "sentOn",
    title: "Sent On",
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

export const LogEmailList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/log-emails",
    async () => {
      const response = await api.get("/api/log-emails");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Log Emails"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/log-emails/new"}>
            <Button>Create Log Email </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: LogEmail) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link
                    className="entity-id"
                    to={`${"/log-emails"}/${item.id}`}
                  >
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.emailEvent}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.emailTo}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.messageId}</>
                </DataGridCell>
                <DataGridCell>
                  <NotificationTitle id={item.notification?.id} />
                </DataGridCell>
                <DataGridCell>
                  <RegistrationTitle id={item.registration?.id} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.sentOn}</>
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
