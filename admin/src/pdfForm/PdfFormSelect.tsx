import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { PdfForm } from "../api/pdfForm/PdfForm";

type Data = PdfForm[];

type Props = Omit<SelectFieldProps, "options">;

export const PdfFormSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/pdf-forms",
    async () => {
      const response = await api.get("/api/pdf-forms");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label:
            item.provatefilename && item.provatefilename.length
              ? item.provatefilename
              : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
