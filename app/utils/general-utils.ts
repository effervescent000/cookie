export const makeLookup = (
  list: { [key: string]: any }[],
  key: string,
  pluckKey?: string
) =>
  list.reduce(
    (acc, cur) => ({ ...acc, [cur[key]]: pluckKey ? cur[pluckKey] : cur }),
    {} as { [key: string]: any }
  );
