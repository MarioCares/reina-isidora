import { ORDINAL_MONTHS } from "@/utils/constants/general/months";
import { prisma } from "@/lib/prisma";

export type TcommonExpensesByYear = {
  [name: string]: number | null;
};

const getCommonExpensesByYear = async (
  year: number,
): Promise<TcommonExpensesByYear[]> => {
  const months = ORDINAL_MONTHS.map(
    (item) => `${year}-${item.padStart(2, "0")}`,
  );
  return prisma.$queryRaw`SELECT a."number",
(SELECT SUM(c."paymentAmount") 
 FROM "common_expenses" AS c 
 WHERE c."apartmentId" = a.id AND to_char(c."referenceMonth",'YYYY-MM') = ${months[0]} ) AS enero,
 (SELECT SUM(c."paymentAmount")
 FROM "common_expenses" AS c 
 WHERE c."apartmentId" = a.id AND to_char(c."referenceMonth",'YYYY-MM') = ${months[1]} ) AS febrero,
 (SELECT SUM(c."paymentAmount")
 FROM "common_expenses" AS c 
 WHERE c."apartmentId" = a.id AND to_char(c."referenceMonth",'YYYY-MM') = ${months[2]} ) AS marzo,
 (SELECT SUM(c."paymentAmount")
 FROM "common_expenses" AS c 
 WHERE c."apartmentId" = a.id AND to_char(c."referenceMonth",'YYYY-MM') = ${months[3]} ) AS abril,
 (SELECT SUM(c."paymentAmount")
 FROM "common_expenses" AS c 
 WHERE c."apartmentId" = a.id AND to_char(c."referenceMonth",'YYYY-MM') = ${months[4]} ) AS mayo,
 (SELECT SUM(c."paymentAmount")
 FROM "common_expenses" AS c 
 WHERE c."apartmentId" = a.id AND to_char(c."referenceMonth",'YYYY-MM') = ${months[5]} ) AS junio,
 (SELECT SUM(c."paymentAmount")
 FROM "common_expenses" AS c 
 WHERE c."apartmentId" = a.id AND to_char(c."referenceMonth",'YYYY-MM') = ${months[6]} ) AS julio,
 (SELECT SUM(c."paymentAmount")
 FROM "common_expenses" AS c 
 WHERE c."apartmentId" = a.id AND to_char(c."referenceMonth",'YYYY-MM') = ${months[7]} ) AS agosto,
 (SELECT SUM(c."paymentAmount")
 FROM "common_expenses" AS c 
 WHERE c."apartmentId" = a.id AND to_char(c."referenceMonth",'YYYY-MM') = ${months[8]} ) AS septiembre,
 (SELECT SUM(c."paymentAmount")
 FROM "common_expenses" AS c 
 WHERE c."apartmentId" = a.id AND to_char(c."referenceMonth",'YYYY-MM') = ${months[9]} ) AS octubre,
 (SELECT SUM(c."paymentAmount")
 FROM "common_expenses" AS c 
 WHERE c."apartmentId" = a.id AND to_char(c."referenceMonth",'YYYY-MM') = ${months[10]} ) AS noviembre,
 (SELECT SUM(c."paymentAmount")
 FROM "common_expenses" AS c 
 WHERE c."apartmentId" = a.id AND to_char(c."referenceMonth",'YYYY-MM') = ${months[11]} ) AS diciembre
FROM "apartments" AS a`;
};

export const CommonExpenses = {
  getCommonExpensesByYear,
};
