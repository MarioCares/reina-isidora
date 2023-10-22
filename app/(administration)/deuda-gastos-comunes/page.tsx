import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CommonExpensesDebtPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  } else {
    return <h1>CommonExpensesDebtPage</h1>;
  }
}
