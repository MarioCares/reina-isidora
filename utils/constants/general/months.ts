import { IDebt } from "@/interfaces/model/IDebt";

export const MONTHS: string[] = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const MONTHS2NUMBER: IMonthsObject = {
  enero: 1,
  febrero: 2,
  marzo: 3,
  abril: 4,
  mayo: 5,
  junio: 6,
  julio: 7,
  agosto: 8,
  septiembre: 9,
  octubre: 10,
  noviembre: 11,
  diciembre: 12,
};

export const ORDINAL_MONTHS: string[] = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

export interface IMonthsObject {
  [month: string]: number;
}

export interface IMonthsObjectDetail {
  [month: string]: string;
}

const findDebtByMonth = (debts: IDebt[], month: number): number => {
  const debt = debts.find((debt) => debt.month === month);
  if (debt) return debt.debtAmount ?? 0;
  return 0;
};

export const VALUES_MONTH = (initialData?: IDebt[]): IMonthsObject => {
  return {
    enero: initialData ? findDebtByMonth(initialData, 1) : 0,
    febrero: initialData ? findDebtByMonth(initialData, 2) : 0,
    marzo: initialData ? findDebtByMonth(initialData, 3) : 0,
    abril: initialData ? findDebtByMonth(initialData, 4) : 0,
    mayo: initialData ? findDebtByMonth(initialData, 5) : 0,
    junio: initialData ? findDebtByMonth(initialData, 6) : 0,
    julio: initialData ? findDebtByMonth(initialData, 7) : 0,
    agosto: initialData ? findDebtByMonth(initialData, 8) : 0,
    septiembre: initialData ? findDebtByMonth(initialData, 9) : 0,
    octubre: initialData ? findDebtByMonth(initialData, 10) : 0,
    noviembre: initialData ? findDebtByMonth(initialData, 11) : 0,
    diciembre: initialData ? findDebtByMonth(initialData, 12) : 0,
  };
};
