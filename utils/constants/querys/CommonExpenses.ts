import { prisma } from "@/lib/prisma";

export type TcommonExpensesByYear = {
  [name: string]: number | null;
};

const getCommonExpensesByYear = async (
  year: number,
): Promise<TcommonExpensesByYear[]> =>
  prisma.$queryRaw`SELECT
  a."number",
  SUM(CASE WHEN to_char(c."referenceMonth",'YYYY-MM') = ${`${year}-01`} THEN c."paymentAmount" ELSE 0 END) AS enero,
  SUM(CASE WHEN to_char(c."referenceMonth",'YYYY-MM') = ${`${year}-02`} THEN c."paymentAmount" ELSE 0 END) AS febrero,
  SUM(CASE WHEN to_char(c."referenceMonth",'YYYY-MM') = ${`${year}-03`} THEN c."paymentAmount" ELSE 0 END) AS marzo,
  SUM(CASE WHEN to_char(c."referenceMonth",'YYYY-MM') = ${`${year}-04`} THEN c."paymentAmount" ELSE 0 END) AS abril,
  SUM(CASE WHEN to_char(c."referenceMonth",'YYYY-MM') = ${`${year}-05`} THEN c."paymentAmount" ELSE 0 END) AS mayo,
  SUM(CASE WHEN to_char(c."referenceMonth",'YYYY-MM') = ${`${year}-06`} THEN c."paymentAmount" ELSE 0 END) AS junio,
  SUM(CASE WHEN to_char(c."referenceMonth",'YYYY-MM') = ${`${year}-07`} THEN c."paymentAmount" ELSE 0 END) AS julio,
  SUM(CASE WHEN to_char(c."referenceMonth",'YYYY-MM') = ${`${year}-08`} THEN c."paymentAmount" ELSE 0 END) AS agosto,
  SUM(CASE WHEN to_char(c."referenceMonth",'YYYY-MM') = ${`${year}-09`} THEN c."paymentAmount" ELSE 0 END) AS septiembre,
  SUM(CASE WHEN to_char(c."referenceMonth",'YYYY-MM') = ${`${year}-10`} THEN c."paymentAmount" ELSE 0 END) AS octubre,
  SUM(CASE WHEN to_char(c."referenceMonth",'YYYY-MM') = ${`${year}-11`} THEN c."paymentAmount" ELSE 0 END) AS noviembre,
  SUM(CASE WHEN to_char(c."referenceMonth",'YYYY-MM') = ${`${year}-12`} THEN c."paymentAmount" ELSE 0 END) AS diciembre
FROM
  "apartments" AS a
LEFT JOIN
  "common_expenses" AS c ON a.id = c."apartmentId"
GROUP BY
  a."number"
ORDER BY a."number";`;

const getCommonExpensesDebtByYear = async (
  year: number,
): Promise<{ [key: string]: number }[]> =>
  prisma.$queryRaw`SELECT a.number, SUM(ced."debtAmount") AS total
FROM common_expenses_debt AS ced
INNER JOIN apartments AS a ON a.id = ced."apartmentId"
WHERE ced.year = ${year}
GROUP BY ced."apartmentId", a.number
ORDER BY ced."apartmentId"`;

export const CommonExpenses = {
  getCommonExpensesByYear,
  getCommonExpensesDebtByYear,
};
