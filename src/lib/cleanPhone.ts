export function cleanPhone(phone: string) {
  const digits = phone.match(/\d/g);
  return `+1${digits ? digits.join('') : ''}`;
}
