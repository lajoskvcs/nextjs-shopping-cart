export const roundFn = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100
