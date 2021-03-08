import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Log } from "../api/log/Log";

type Data = Log[];

type Props = Omit<SelectFieldProps, "options">;

export const LogSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>("select-/api/logs", async () => {
    const response = await api.get("/api/logs");
    return response.data;
  });

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label:
            item.category && item.category.length ? item.category : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
