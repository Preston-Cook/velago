export const handleEmpty = (value: string | null): string | null => {
  return value === '' ? null : value;
};
