export const getPagenameByPath = (path: string): string => {
  if (path === "/") return "Escritorio";
  if (path.includes("/gastos-comunes")) {
    const part = path.split("/");
    if (!isNaN(Number(part[2])) && part.length === 3)
      return `Gastos Comunes Año ${part[2]}`;
  }
  if (path.includes("/deuda-gastos-comunes")) {
    const part = path.split("/");
    if (!isNaN(Number(part[2])) && part.length === 3)
      return `Deuda Gastos Comunes Año ${part[2]}`;
    if (!isNaN(Number(part[2])) && !isNaN(Number(part[3])) && part.length === 4)
      return `Deuda Gastos Comunes Año ${part[2]} Departamento ${part[3]}`;
  }
  if (path.includes("/departamentos")) {
    const part = path.split("/");
    if (part.length === 2) return "Departamentos";
    if (part[2] === "0") return "Agregar Departamento";
  }
  return path;
};
