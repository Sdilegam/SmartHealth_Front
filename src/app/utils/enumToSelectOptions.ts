export function enumToSelectOptions<T extends object>(
  enumObj: T,
  labelMap: Record<number, string>
): { label: string; value: number }[] {
  return Object.keys(enumObj)
    .filter(key => !isNaN(Number(key))) // keep only numeric keys
    .map(key => {
      const value = Number(key);
      return {
        value,
        label: labelMap[value] ?? enumObj[value as keyof typeof enumObj]
      };
    });
}
