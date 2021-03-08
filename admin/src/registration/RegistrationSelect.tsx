import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Registration } from "../api/registration/Registration";

type Data = Registration[];

type Props = Omit<SelectFieldProps, "options">;

export const RegistrationSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/registrations",
    async () => {
      const response = await api.get("/api/registrations");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.dba && item.dba.length ? item.dba : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
