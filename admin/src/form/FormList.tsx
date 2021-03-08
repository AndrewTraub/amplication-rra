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

import { StateTitle } from "../state/StateTitle";
import { Form } from "../api/form/Form";

type Data = Form[];

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
    name: "mustAcceptRisk",
    title: "Must Accept Risk",
    sortable: false,
  },
  {
    name: "privateDescription",
    title: "Private Description",
    sortable: false,
  },
  {
    name: "provatefilename",
    title: "Private Filename",
    sortable: false,
  },
  {
    name: "public",
    title: "Public",
    sortable: false,
  },
  {
    name: "publicDescription",
    title: "Public Description",
    sortable: false,
  },
  {
    name: "publicName",
    title: "Public Name",
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
    name: "useRegistrationDate",
    title: "Use Registration Date",
    sortable: false,
  },
];

export const FormList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/forms",
    async () => {
      const response = await api.get("/api/forms");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Forms"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/forms/new"}>
            <Button>Create Form </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: Form) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link className="entity-id" to={`${"/forms"}/${item.id}`}>
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>
                    {item.mustAcceptRisk && (
                      <CircleIcon
                        icon="check"
                        style={EnumCircleIconStyle.positive}
                      />
                    )}
                  </>
                </DataGridCell>
                <DataGridCell>
                  <>{item.privateDescription}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.provatefilename}</>
                </DataGridCell>
                <DataGridCell>
                  <>
                    {item.public && (
                      <CircleIcon
                        icon="check"
                        style={EnumCircleIconStyle.positive}
                      />
                    )}
                  </>
                </DataGridCell>
                <DataGridCell>
                  <>{item.publicDescription}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.publicName}</>
                </DataGridCell>
                <DataGridCell>
                  <StateTitle id={item.state?.id} />
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.updatedAt} />
                </DataGridCell>
                <DataGridCell>
                  <>
                    {item.useRegistrationDate && (
                      <CircleIcon
                        icon="check"
                        style={EnumCircleIconStyle.positive}
                      />
                    )}
                  </>
                </DataGridCell>
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
