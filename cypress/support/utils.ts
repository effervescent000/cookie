export const makeDataCy = (label: string) => `[data-cy="${label}"]`;

export const parseAllValues = (obj: { [key: string]: string }) =>
  Object.entries(obj)
    .map(([key, value]) => ({ [key]: JSON.parse(value) }))
    .reduce((acc, cur) => ({ ...acc, ...cur }), {});

export const extractSearchFromUrl = (url: string) => url.match(/\/(\w+-?)+$/);
