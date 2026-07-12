export function formatElementPercent(value: number): string {
  return value.toFixed(3);
}

export function formatOxidePercent(value: number): string {
  return value.toFixed(2);
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function formatTons(value: number): string {
  return `${value.toFixed(2)} ton`;
}

export function formatChargePercent(value: number): string {
  return `${value.toFixed(1)}%`;
}