import { NextApiRequest } from "next";
import { User, $Enums } from "@prisma/client";
import Role = $Enums.Role;
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextApiRequest,
  { params }: { params: { role: string } },
): Promise<NextResponse<User[]>> {
  const role: Role = params.role as Role;
  const users: User[] = await prisma.user.findMany({
    where: {
      role,
    },
  });
  return NextResponse.json(users);
}
