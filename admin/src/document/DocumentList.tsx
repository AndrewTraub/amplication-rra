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

import { RegistrationTitle } from "../registration/RegistrationTitle";
import { AgentTitle } from "../agent/AgentTitle";
import { UserTitle } from "../user/UserTitle";
import { Document } from "../api/document/Document";

type Data = Document[];

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
    name: "fileType",
    title: "File Type",
    sortable: false,
  },
  {
    name: "fileUrl",
    title: "File URL",
    sortable: false,
  },
  {
    name: "notes",
    title: "Notes",
    sortable: false,
  },
  {
    name: "registrationId",
    title: "Registration ID",
    sortable: false,
  },
  {
    name: "title",
    title: "Title",
    sortable: false,
  },
  {
    name: "updatedAt",
    title: "Updated At",
    sortable: false,
  },
  {
    name: "uploadedBy",
    title: "Uploaded By",
    sortable: false,
  },
  {
    name: "userId",
    title: "User ID",
    sortable: false,
  },
];

export const DocumentList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/documents",
    async () => {
      const response = await api.get("/api/documents");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Documents"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/documents/new"}>
            <Button>Create Document </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: Document) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link className="entity-id" to={`${"/documents"}/${item.id}`}>
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.fileType}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.fileUrl}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.notes}</>
                </DataGridCell>
                <DataGridCell>
                  <RegistrationTitle id={item.registrationId?.id} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.title}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.updatedAt} />
                </DataGridCell>
                <DataGridCell>
                  <AgentTitle id={item.uploadedBy?.id} />
                </DataGridCell>
                <DataGridCell>
                  <UserTitle id={item.userId?.id} />
                </DataGridCell>
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
