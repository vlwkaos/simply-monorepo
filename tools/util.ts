/**
 * 
 * @param arg 
 * @returns 
 */
export const parseArg = (arg: string) => {
  const index = process.argv.indexOf(arg);
  return index > -1 ? process.argv[index + 1] : null;
};