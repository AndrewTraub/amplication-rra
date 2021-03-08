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

import { JournalAccountTitle } from "../journalAccount/JournalAccountTitle";
import { AgentTitle } from "../agent/AgentTitle";
import { JournalCategoryTitle } from "../journalCategory/JournalCategoryTitle";
import { RegistrationTitle } from "../registration/RegistrationTitle";
import { UserTitle } from "../user/UserTitle";
import { Journal } from "../api/journal/Journal";

type Data = Journal[];

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
    name: "account",
    title: "Account",
    sortable: false,
  },
  {
    name: "agent",
    title: "Agent",
    sortable: false,
  },
  {
    name: "amount",
    title: "Amount",
    sortable: false,
  },
  {
    name: "category",
    title: "Category",
    sortable: false,
  },
  {
    name: "comment",
    title: "Comment",
    sortable: false,
  },
  {
    name: "createdAt",
    title: "Created At",
    sortable: false,
  },
  {
    name: "dc",
    title: "DC",
    sortable: false,
  },
  {
    name: "description",
    title: "Description",
    sortable: false,
  },
  {
    name: "journaltype",
    title: "Journal Type",
    sortable: false,
  },
  {
    name: "postDate",
    title: "Post Date",
    sortable: false,
  },
  {
    name: "posted",
    title: "Posted",
    sortable: false,
  },
  {
    name: "registration",
    title: "Registration",
    sortable: false,
  },
  {
    name: "source",
    title: "Source",
    sortable: false,
  },
  {
    name: "transactionDate",
    title: "Transaction Date",
    sortable: false,
  },
  {
    name: "transactionId",
    title: "Transaction ID",
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

export const JournalList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/journals",
    async () => {
      const response = await api.get("/api/journals");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Journals"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/journals/new"}>
            <Button>Create Journal </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: Journal) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link className="entity-id" to={`${"/journals"}/${item.id}`}>
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <JournalAccountTitle id={item.account?.id} />
                </DataGridCell>
                <DataGridCell>
                  <AgentTitle id={item.agent?.id} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.amount}</>
                </DataGridCell>
                <DataGridCell>
                  <JournalCategoryTitle id={item.category?.id} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.comment}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.dc}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.description}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.journaltype}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.postDate}</>
                </DataGridCell>
                <DataGridCell>
                  <>
                    {item.posted && (
                      <CircleIcon
                        icon="check"
                        style={EnumCircleIconStyle.positive}
                      />
                    )}
                  </>
                </DataGridCell>
                <DataGridCell>
                  <RegistrationTitle id={item.registration?.id} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.source}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.transactionDate}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.transactionId}</>
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
