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

import { EmailListTitle } from "../emailList/EmailListTitle";
import { EmailTemplate } from "../api/emailTemplate/EmailTemplate";

type Data = EmailTemplate[];

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
    name: "active",
    title: "Active",
    sortable: false,
  },
  {
    name: "body",
    title: "Body",
    sortable: false,
  },
  {
    name: "createdAt",
    title: "Created At",
    sortable: false,
  },
  {
    name: "delay",
    title: "Delay",
    sortable: false,
  },
  {
    name: "emailList",
    title: "Email List",
    sortable: false,
  },
  {
    name: "sequenceNumber",
    title: "Sequence Number",
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
];

export const EmailTemplateList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/email-templates",
    async () => {
      const response = await api.get("/api/email-templates");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Email Templates"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/email-templates/new"}>
            <Button>Create Email Template </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: EmailTemplate) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link
                    className="entity-id"
                    to={`${"/email-templates"}/${item.id}`}
                  >
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <>
                    {item.active && (
                      <CircleIcon
                        icon="check"
                        style={EnumCircleIconStyle.positive}
                      />
                    )}
                  </>
                </DataGridCell>
                <DataGridCell>
                  <>{item.body}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.delay}</>
                </DataGridCell>
                <DataGridCell>
                  <EmailListTitle id={item.emailList?.id} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.sequenceNumber}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.title}</>
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
