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
  CircleIcon,
  EnumCircleIconStyle,
} from "@amplication/design-system";

import { UserTitle } from "../user/UserTitle";
import { EmailQueue } from "../api/emailQueue/EmailQueue";

type Data = EmailQueue[];

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
    name: "sent",
    title: "Sent",
    sortable: false,
  },
  {
    name: "subject",
    title: "Subject",
    sortable: false,
  },
  {
    name: "timeToSend",
    title: "Time to Send",
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

export const EmailQueueList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/email-queues",
    async () => {
      const response = await api.get("/api/email-queues");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Email Queues"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/email-queues/new"}>
            <Button>Create Email Queue </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: EmailQueue) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link
                    className="entity-id"
                    to={`${"/email-queues"}/${item.id}`}
                  >
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
                  <>
                    {item.sent && (
                      <CircleIcon
                        icon="check"
                        style={EnumCircleIconStyle.positive}
                      />
                    )}
                  </>
                </DataGridCell>
                <DataGridCell>
                  <>{item.subject}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.timeToSend}</>
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
