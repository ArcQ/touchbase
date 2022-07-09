import { pipe } from './fn';

const getEnumByString = (enumv: any): any =>
  pipe(
    str => Object.keys(enumv).filter(x => enumv[x] == str),
    filtered => filtered[0],
  );

export default getEnumByString;
