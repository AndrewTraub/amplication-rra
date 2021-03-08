import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { LogText } from "../api/logText/LogText";

type Data = LogText[];

type Props = Omit<SelectFieldProps, "options">;

export const LogTextSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/log-texts",
    async () => {
      const response = await api.get("/api/log-texts");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.message && item.message.length ? item.message : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
