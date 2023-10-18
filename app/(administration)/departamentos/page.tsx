import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button, Container } from "@mui/material";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate: number = 10;

export default async function ApartmentsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  } else {
    const apartments = await prisma.apartment.findMany();
    console.log("apartments", apartments);
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Button
          variant={"contained"}
          LinkComponent={Link}
          href={"/departamentos/0"}
        >
          Agregar Departamento
        </Button>
      </Container>
    );
  }
}
