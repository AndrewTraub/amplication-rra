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

import { CompanyTitle } from "../company/CompanyTitle";
import { Registration } from "../api/registration/Registration";

type Data = Registration[];

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
    name: "automaticRenewal",
    title: "Automatic Renewal",
    sortable: false,
  },
  {
    name: "cancelledDate",
    title: "Cancelled Date",
    sortable: false,
  },
  {
    name: "companyId",
    title: "Company ID",
    sortable: false,
  },
  {
    name: "createdAt",
    title: "Created At",
    sortable: false,
  },
  {
    name: "dba",
    title: "DBA",
    sortable: false,
  },
  {
    name: "exp",
    title: "Exp",
    sortable: false,
  },
  {
    name: "four",
    title: "Four",
    sortable: false,
  },
  {
    name: "merchant",
    title: "Merchant",
    sortable: false,
  },
  {
    name: "noGracePeriod",
    title: "No Grace Period",
    sortable: false,
  },
  {
    name: "period",
    title: "Period",
    sortable: false,
  },
  {
    name: "registeredDate",
    title: "Registered Date",
    sortable: false,
  },
  {
    name: "renewalDate",
    title: "Renewal Date",
    sortable: false,
  },
  {
    name: "state",
    title: "State",
    sortable: false,
  },
  {
    name: "status",
    title: "Status",
    sortable: false,
  },
  {
    name: "subscriptionId",
    title: "Subscription ID",
    sortable: false,
  },
  {
    name: "updatedAt",
    title: "Updated At",
    sortable: false,
  },
];

export const RegistrationList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/registrations",
    async () => {
      const response = await api.get("/api/registrations");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Registrations"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/registrations/new"}>
            <Button>Create Registration </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: Registration) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link
                    className="entity-id"
                    to={`${"/registrations"}/${item.id}`}
                  >
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <>
                    {item.automaticRenewal && (
                      <CircleIcon
                        icon="check"
                        style={EnumCircleIconStyle.positive}
                      />
                    )}
                  </>
                </DataGridCell>
                <DataGridCell>
                  <>{item.cancelledDate}</>
                </DataGridCell>
                <DataGridCell>
                  <CompanyTitle id={item.companyId?.id} />
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.dba}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.exp}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.four}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.merchant}</>
                </DataGridCell>
                <DataGridCell>
                  <>
                    {item.noGracePeriod && (
                      <CircleIcon
                        icon="check"
                        style={EnumCircleIconStyle.positive}
                      />
                    )}
                  </>
                </DataGridCell>
                <DataGridCell>
                  <>{item.period}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.registeredDate}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.renewalDate}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.state}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.status}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.subscriptionId}</>
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
