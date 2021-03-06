import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { EmailTemplate } from "../api/emailTemplate/EmailTemplate";

type Data = EmailTemplate[];

type Props = Omit<SelectFieldProps, "options">;

export const EmailTemplateSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/email-templates",
    async () => {
      const response = await api.get("/api/email-templates");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.title && item.title.length ? item.title : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
