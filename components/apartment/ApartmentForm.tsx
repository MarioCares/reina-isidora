"use client";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";
import useApartmentUpsert from "@/hooks/useApartmentUpsert";

interface IApartmentFormProps {
  id: number;
  number: number;
  prorating: number;
}

interface ErrorValues {
  number: string;
  prorating: string;
}

const ApartmentForm = ({ apartment }: { apartment: IApartmentFormProps }) => {
  const { loadingApartmentUpsert, statusApartmentUpsert, handleUpsert } =
    useApartmentUpsert();

  return (
    <>
      {statusApartmentUpsert && statusApartmentUpsert === "ok" && (
        <Box sx={{ mb: 5 }}>
          <Alert severity="success">Departamento actualizado!</Alert>
        </Box>
      )}
      <Formik
        initialValues={apartment}
        validate={(values: IApartmentFormProps) => {
          const errors: Partial<ErrorValues> = {};
          if (!values.number) {
            errors.number = "Requerido";
          } else if (values.number <= 0 || values.number >= 215) {
            errors.number = "Número departamento incorrecto";
          }
          if (!values.prorating) {
            errors.prorating = "Requerido";
          } else if (values.prorating < 0 || values.prorating > 3) {
            errors.prorating = "Porcentaje prorrateo incorrecto";
          }
          return errors;
        }}
        onSubmit={(values) => handleUpsert(values)}
      >
        {({ submitForm }) => (
          <Form>
            <Stack direction="row" spacing={2}>
              <Field
                component={TextField}
                name="number"
                type="number"
                label="Número"
                disabled={false}
              />
              <Field
                component={TextField}
                name="prorating"
                type="number"
                label="Prorrateo"
                disabled={false}
              />
            </Stack>
            {loadingApartmentUpsert && (
              <Backdrop
                sx={{ color: "#fff" }}
                open={loadingApartmentUpsert}
                onClick={() => {}}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            )}
            <br />
            <Button
              variant="contained"
              color="primary"
              disabled={loadingApartmentUpsert}
              onClick={submitForm}
            >
              Actualizar
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ApartmentForm;
