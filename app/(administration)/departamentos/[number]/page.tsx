import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Container } from "@mui/material";
import ApartmentForm from "@/components/apartment/ApartmentForm";
import { prisma } from "@/lib/prisma";

export default async function ApartmentPage({
  params,
}: {
  params: { number: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  } else {
    const apartment = await prisma.apartment.findFirst({
      where: {
        number: Number(params.number),
      },
    });
    const data = apartment
      ? {
          id: apartment.id,
          number: apartment.number,
          prorating: Number(apartment.prorating),
        }
      : {
          id: 0,
          number: 0,
          prorating: 0,
        };

    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <ApartmentForm apartment={data} />
      </Container>
    );
  }
}
