import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Container from "@mui/material/Container";
import { prisma } from "@/lib/prisma";

export const revalidate: number = 10;

export default async function CommonExpensesYearByApartment({
  params,
}: {
  params: { year: number; apartment: number };
}) {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  } else {
    const apartment = await prisma.apartment.findFirst({
      where: {
        number: Number(params.apartment),
      },
    });

    console.log("apartment", apartment);
    return <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}></Container>;
  }
}
