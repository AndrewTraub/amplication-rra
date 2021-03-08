import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { EmailQueue } from "../api/emailQueue/EmailQueue";

type Data = EmailQueue[];

type Props = Omit<SelectFieldProps, "options">;

export const EmailQueueSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/email-queues",
    async () => {
      const response = await api.get("/api/email-queues");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.subject && item.subject.length ? item.subject : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
