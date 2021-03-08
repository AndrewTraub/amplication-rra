import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { LogEmail } from "../api/logEmail/LogEmail";

type Data = LogEmail[];

type Props = Omit<SelectFieldProps, "options">;

export const LogEmailSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/log-emails",
    async () => {
      const response = await api.get("/api/log-emails");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label:
            item.emailEvent && item.emailEvent.length
              ? item.emailEvent
              : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
