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

import { RegistrationTitle } from "../registration/RegistrationTitle";
import { Notification } from "../api/notification/Notification";

type Data = Notification[];

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
    name: "disabled",
    title: "Disabled",
    sortable: false,
  },
  {
    name: "email",
    title: "Email",
    sortable: false,
  },
  {
    name: "fax",
    title: "Fax",
    sortable: false,
  },
  {
    name: "phone",
    title: "Phone",
    sortable: false,
  },
  {
    name: "registrationId",
    title: "Registration ID",
    sortable: false,
  },
  {
    name: "sendFax",
    title: "Send Fax",
    sortable: false,
  },
  {
    name: "sendSms",
    title: "Send SMS",
    sortable: false,
  },
  {
    name: "updatedAt",
    title: "Updated At",
    sortable: false,
  },
];

export const NotificationList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/notifications",
    async () => {
      const response = await api.get("/api/notifications");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Notifications"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/notifications/new"}>
            <Button>Create Notification </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: Notification) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link
                    className="entity-id"
                    to={`${"/notifications"}/${item.id}`}
                  >
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>
                    {item.disabled && (
                      <CircleIcon
                        icon="check"
                        style={EnumCircleIconStyle.positive}
                      />
                    )}
                  </>
                </DataGridCell>
                <DataGridCell>
                  <>{item.email}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.fax}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.phone}</>
                </DataGridCell>
                <DataGridCell>
                  <RegistrationTitle id={item.registrationId?.id} />
                </DataGridCell>
                <DataGridCell>
                  <>
                    {item.sendFax && (
                      <CircleIcon
                        icon="check"
                        style={EnumCircleIconStyle.positive}
                      />
                    )}
                  </>
                </DataGridCell>
                <DataGridCell>
                  <>
                    {item.sendSms && (
                      <CircleIcon
                        icon="check"
                        style={EnumCircleIconStyle.positive}
                      />
                    )}
                  </>
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
