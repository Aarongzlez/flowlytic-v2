export function calculate({volume, minutes, hourlyCost, reduction}) {
  const constraints = [[volume,1,100000,1],[minutes,1,480,1],[hourlyCost,1,1000,1],[reduction,5,95,5]];
  if (constraints.some(([value,min,max,step]) => !Number.isFinite(value) || value < min || value > max || value % step !== 0)) return null;
  const manualHours = volume * minutes / 60;
  const recoveredHours = manualHours * reduction / 100;
  const monthlyValue = recoveredHours * hourlyCost;
  return {manualHours, recoveredHours, monthlyValue, annualValue:monthlyValue*12};
}
export const hoursFormat = new Intl.NumberFormat('en-US', {minimumFractionDigits:1,maximumFractionDigits:1});
export const moneyFormat = new Intl.NumberFormat('en-US', {style:'currency',currency:'USD',maximumFractionDigits:0});
export function estimateMessage(result) {
  return `I would like to review a workflow with an estimated ${hoursFormat.format(result.manualHours)} manual hours per month and ${hoursFormat.format(result.recoveredHours)} potential hours recovered.`;
}
export function appendEstimate(existing, message, limit=2000) {
  if (existing.includes(message)) return existing;
  const combined = existing ? `${existing}\n\n${message}` : message;
  return combined.length <= limit ? combined : null;
}
