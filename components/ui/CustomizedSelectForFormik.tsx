import { Select } from "@mui/material";
import { FieldInputProps, FormikProps } from "formik";
import { ICommonExpensesFormik } from "@/components/commonExpenses/CommonExpensesValidate";
import { ReactElement } from "react";

type CustomizedSelectForFormikProps = {
  field: FieldInputProps<string>;
  form: FormikProps<ICommonExpensesFormik>;
  children: ReactElement;
};
const CustomizedSelectForFormik = ({
  field,
  form,
  children,
}: CustomizedSelectForFormikProps) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <Select
      name={name}
      value={value}
      onChange={(e) => setFieldValue(name, e.target.value)}
    >
      {children}
    </Select>
  );
};

export default CustomizedSelectForFormik;
