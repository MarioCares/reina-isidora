import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button, Container } from "@mui/material";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import ApartmentList from "@/components/apartment/ApartmentList";

export const revalidate: number = 10;

export default async function ApartmentsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  } else {
    const apartments = await prisma.apartment.findMany();

    const columns: GridColDef[] = [
      {
        field: "id",
        headerName: "ID",
        type: "number",
      },
      {
        field: "number",
        headerName: "Número",
      },
      {
        field: "prorating",
        headerName: "Prorateo",
      },
      {
        field: "actions",
        headerName: "-",
      },
    ];

    const rows: GridRowsProp = apartments.map((apartment) => ({
      id: apartment.id,
      number: apartment.number,
      prorating: apartment.prorating.toString(),
    }));

    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Button
          variant={"contained"}
          LinkComponent={Link}
          href={"/departamentos/0"}
        >
          Agregar Departamento
        </Button>
        <ApartmentList rows={rows} columns={columns} />
      </Container>
    );
  }
}
