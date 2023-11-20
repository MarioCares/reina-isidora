"use client";
import useSaveCommonExpenseDebtStart from "@/hooks/useSaveCommonExpenseDebtStart";
import Box from "@mui/material/Box";
import { Alert } from "@mui/material";
import { Field, Form, Formik } from "formik";
import {
  IMonthsObject,
  MONTHS,
  VALUES_MONTH,
} from "@/utils/constants/general/months";
import Grid from "@mui/material/Grid";
import Item from "@/components/ui/Item";
import { TextField } from "formik-mui";
import Button from "@mui/material/Button";
import {
  convertToICommonExpenseDebtDetail,
  validate,
} from "@/components/commonExpensesDebt/CommonExpensesDebtStartValidate";
import { useRouter } from "next/navigation";
import { IDebt } from "@/interfaces/model/IDebt";

interface ICommonExpensesDebtStartProps {
  year: number;
  number: number;
  debt?: IDebt[];
}

const CommonExpensesDebtStart = ({
  year,
  number,
  debt,
}: ICommonExpensesDebtStartProps) => {
  const {
    isLoadingSaveCommonExpenseDebtStart,
    statusSaveCommonExpenseDebtStart,
    handleSaveCommonExpenseDebtStart,
  } = useSaveCommonExpenseDebtStart();
  const router = useRouter();

  const handleSubmit = (values: IMonthsObject) => {
    handleSaveCommonExpenseDebtStart(
      {
        number,
        year,
        detail: convertToICommonExpenseDebtDetail(values),
      },
      debt === undefined,
    );
  };

  return (
    <>
      {statusSaveCommonExpenseDebtStart && (
        <Box sx={{ mb: 5 }}>
          {statusSaveCommonExpenseDebtStart === "ok" ? (
            <>
              <Alert severity="success">Cuotas gasto común registradas!</Alert>
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.refresh()}
              >
                Recargar Página
              </Button>
            </>
          ) : (
            <Alert severity="error">{statusSaveCommonExpenseDebtStart}</Alert>
          )}
        </Box>
      )}
      <Formik
        initialValues={VALUES_MONTH(debt)}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ submitForm }) => (
          <Form>
            <Grid container spacing={2}>
              {MONTHS.map((month) => (
                <Grid key={`input-${month}`} item xs="auto">
                  <Item>
                    <Field
                      component={TextField}
                      name={month.toLowerCase()}
                      type="number"
                      label={month}
                      disabled={isLoadingSaveCommonExpenseDebtStart}
                    />
                  </Item>
                </Grid>
              ))}
            </Grid>
            <br />
            <Button
              variant="contained"
              color="primary"
              disabled={isLoadingSaveCommonExpenseDebtStart}
              onClick={submitForm}
            >
              Guardar
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CommonExpensesDebtStart;
