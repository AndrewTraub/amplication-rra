import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { State } from "../api/state/State";

type Data = State[];

type Props = Omit<SelectFieldProps, "options">;

export const StateSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/states",
    async () => {
      const response = await api.get("/api/states");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.sosFax && item.sosFax.length ? item.sosFax : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
