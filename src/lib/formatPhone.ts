export default function formatPhone(input: string): string {
  if (input.includes('(') && !input.includes(')')) {
    return input.slice(1, -1);
  }

  // Remove all non-digit characters from the input string
  const cleaned = input.replace(/\D/g, '');

  // Check if the cleaned input is empty or has fewer than 3 digits
  if (cleaned.length === 0 || cleaned.length < 3) {
    return cleaned;
  }

  // Format the phone number with parentheses around the area code
  const areaCode = cleaned.slice(0, 3);
  const firstPart = cleaned.slice(3, 6);
  const secondPart = cleaned.slice(6, 10);

  let formatted = `(${areaCode})`;

  if (firstPart) {
    formatted += ` ${firstPart}`;
  }

  if (secondPart) {
    formatted += `-${secondPart}`;
  }

  return formatted;
}
