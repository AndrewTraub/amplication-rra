import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { JournalAccount } from "../api/journalAccount/JournalAccount";

type Data = JournalAccount[];

type Props = Omit<SelectFieldProps, "options">;

export const JournalAccountSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/journal-accounts",
    async () => {
      const response = await api.get("/api/journal-accounts");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label:
            item.accountNumber && item.accountNumber.length
              ? item.accountNumber
              : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
