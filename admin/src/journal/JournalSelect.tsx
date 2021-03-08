import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Journal } from "../api/journal/Journal";

type Data = Journal[];

type Props = Omit<SelectFieldProps, "options">;

export const JournalSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/journals",
    async () => {
      const response = await api.get("/api/journals");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.comment && item.comment.length ? item.comment : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
