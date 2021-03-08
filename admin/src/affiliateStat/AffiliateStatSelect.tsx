import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { AffiliateStat } from "../api/affiliateStat/AffiliateStat";

type Data = AffiliateStat[];

type Props = Omit<SelectFieldProps, "options">;

export const AffiliateStatSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/affiliate-stats",
    async () => {
      const response = await api.get("/api/affiliate-stats");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.ip && item.ip.length ? item.ip : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
