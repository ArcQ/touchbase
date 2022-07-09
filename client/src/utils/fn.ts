export const pipe = (...fns: Function[]) => (x: any) => fns.reduce((v: any, f: any) => f(v), x);
