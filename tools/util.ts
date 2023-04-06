import fs from 'fs';
import path from 'path';

/**
 * 
 * @param arg 
 * @returns 
 */
export const parseArg = (arg: string) => {
  const index = process.argv.indexOf(arg);
  return index > -1 ? process.argv[index + 1] : null;
};

// function that reads a file and replaces all instances of a string with another string
// supports multiple instances of the string
export const replaceTextInFile = (filePath: string, textSets: { from: string, to: string }[]) => {
  fs.readFile(
    path.join(__dirname, filePath),
    'utf-8',
    (err, data) => {
      if (err) throw err;
      console.log(`⏳ Replacing text in ${filePath}...`)
      textSets.forEach(({ from, to }) => {
        console.log(`⏳ Replacing ${from} with ${to}...`)
        data = data.replace(new RegExp(from, 'g'), to);
      })
      fs.writeFile(
        path.join(__dirname, filePath),
        data,
        'utf-8',
        (err) => {
          if (err) throw err;
          console.log(`✅ ${filePath} : DONE!!`)
        })
    }
  );
};
