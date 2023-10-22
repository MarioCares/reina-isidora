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

export const VALUES_MONTH: IMonthsObject = {
  enero: 0,
  febrero: 0,
  marzo: 0,
  abril: 0,
  mayo: 0,
  junio: 0,
  julio: 0,
  agosto: 0,
  septiembre: 0,
  octubre: 0,
  noviembre: 0,
  diciembre: 0,
};
