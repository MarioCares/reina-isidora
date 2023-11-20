"use client";
import type { CommonExpenses, User } from "@prisma/client";
import { Field, FieldInputProps, Form, Formik, FormikProps } from "formik";
import Grid from "@mui/material/Grid";
import Item from "@/components/ui/Item";
import { TextField } from "formik-mui";
import {
  getInitialValues,
  ICommonExpensesFormik,
  validate,
} from "@/components/commonExpenses/CommonExpensesValidate";
import Button from "@mui/material/Button";
import CustomizedSelectForFormik from "@/components/ui/CustomizedSelectForFormik";
import {
  Alert,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { PaymentType } from "@prisma/client";
import useSaveCommonExpense from "@/hooks/useSaveCommonExpense";
import Box from "@mui/material/Box";
import useGetUsers from "@/hooks/useGetUsers";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";

type TCommonExpensesProps = {
  commonExpenses?: CommonExpenses;
  apartment?: number;
  referenceMonth?: Date;
};

const CommonExpenses = ({
  commonExpenses,
  apartment,
  referenceMonth,
}: TCommonExpensesProps) => {
  const {
    isLoadingSaveCommonExpense,
    statusSaveCommonExpense,
    handleSaveCommonExpense,
  } = useSaveCommonExpense();
  const { isLoading, users, error } = useGetUsers("USER");
  const handleSubmit = (values: ICommonExpensesFormik) => {
    const time = new Date().toISOString().split("T")[1];
    handleSaveCommonExpense(
      {
        ...values,
        paymentAt: `${values.paymentAt}T${time}`,
        referenceMonth: `${values.referenceMonth}-01T${time}`,
      },
      commonExpenses === undefined,
    );
  };

  return (
    <>
      {(isLoadingSaveCommonExpense || isLoading) && <CircularProgress />}
      {statusSaveCommonExpense && (
        <Box sx={{ mb: 5 }}>
          {statusSaveCommonExpense === "ok" ? (
            <>
              <Alert severity="success">Gasto común registrado!</Alert>
              <Link href={`/gastos-comunes/${new Date().getFullYear()}`}>
                Volver a listado
              </Link>
            </>
          ) : (
            <Alert severity="error">{statusSaveCommonExpense}</Alert>
          )}
        </Box>
      )}
      {error && <Alert severity="error">{error}</Alert>}
      <Formik
        initialValues={getInitialValues(
          commonExpenses,
          apartment,
          referenceMonth,
        )}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ submitForm }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs="auto">
                <Item>
                  <Field
                    component={TextField}
                    name="paymentAt"
                    type="date"
                    label="Fecha Pago"
                  />
                </Item>
              </Grid>
              <Grid item xs="auto">
                <Item>
                  <Field
                    component={TextField}
                    name="apartment"
                    type="number"
                    label="Departamento"
                  />
                </Item>
              </Grid>
              <Grid item xs="auto">
                <Item>
                  <Field
                    component={TextField}
                    name="referenceMonth"
                    type="month"
                    label="Mes Correspondiente"
                  />
                </Item>
              </Grid>
              <Grid item xs="auto">
                <Item>
                  <Field
                    component={TextField}
                    name="paymentAmount"
                    type="number"
                    label="Monto"
                  />
                </Item>
              </Grid>
            </Grid>
            <Grid container spacing={2} paddingTop={2}>
              <Grid item xs="auto">
                <Item>
                  <Field
                    component={CustomizedSelectForFormik}
                    name="paymentType"
                    label="Forma de Pago"
                  >
                    {Object.entries(PaymentType).map(([key, value]) => (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    ))}
                  </Field>
                </Item>
              </Grid>
              <Grid item xs="auto">
                <Item>
                  <Field
                    component={TextField}
                    name="bank"
                    type="text"
                    label="Banco"
                  />
                </Item>
              </Grid>
              <Grid item xs="auto">
                <Item>
                  <Field
                    component={TextField}
                    name="checkNumber"
                    type="text"
                    label="Nº Cheque"
                  />
                </Item>
              </Grid>
              <Grid item xs={3}>
                <Item>
                  <FormControl fullWidth>
                    <InputLabel>Registrado Por</InputLabel>
                    <Field name="registerBy">
                      {({
                        field,
                        form,
                      }: {
                        field: FieldInputProps<string>;
                        form: FormikProps<ICommonExpensesFormik>;
                      }) => (
                        <>
                          <Select
                            label="Registrado Por"
                            {...field}
                            color={
                              form.errors.registerBy && form.touched.registerBy
                                ? "error"
                                : undefined
                            }
                          >
                            {users.map((user: User) => (
                              <MenuItem key={user.id} value={user.id}>
                                {user.name}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>
                            {form.errors.registerBy && form.touched.registerBy
                              ? form.errors.registerBy
                              : ""}
                          </FormHelperText>
                        </>
                      )}
                    </Field>
                  </FormControl>
                </Item>
              </Grid>
            </Grid>
            <Grid container spacing={2} paddingTop={2}>
              <Grid item xs="auto">
                <Item>
                  <Field
                    component={TextField}
                    name="receipt"
                    type="number"
                    label="Nº Recibo"
                  />
                </Item>
              </Grid>
              <Grid item xs="auto">
                <Item>
                  <Field
                    component={TextField}
                    name="payBy"
                    type="text"
                    label="Pagado Por"
                  />
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item>
                  <FormControl fullWidth>
                    <Field
                      component={TextField}
                      name="observation"
                      type="text"
                      label="Observación"
                    />
                  </FormControl>
                </Item>
              </Grid>
            </Grid>
            <br />
            <Button
              variant="contained"
              color="primary"
              disabled={false}
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

export default CommonExpenses;
