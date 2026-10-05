/** O'zbekcha raqam formati: 1 200 va 4,9 (server va brauzerda bir xil natija). */
export function formatNumber(v: number, decimals = 0) {
  const [int, frac] = v.toFixed(decimals).split('.');
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return frac ? `${grouped},${frac}` : grouped;
}
