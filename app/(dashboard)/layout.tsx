import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Layout from "@/components/dashboard/Layout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Intranet Comunidad Reina Isidora",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout role={role}>{children}</Layout>
      </body>
    </html>
  );
}
