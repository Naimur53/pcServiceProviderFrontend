export const optionCreator = (single: string) => ({
  label: single.split("_").join(" ").toLowerCase(),
  value: single,
});
