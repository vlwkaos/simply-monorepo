/**
 * --name: name of the subrepo
 */
import fs from 'fs';
import path from 'path';
import { parseArg } from './util';

// get if it's a library or an app
const new_name = parseArg('--name');
if (new_name === null) {
  console.log('⚠️ Please provide a name for the subrepo');
  process.exit(1);
}

// extract current name from package.json
const data = fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
const monorepo_name = data.match(/"name": "(.*)"/)![1];

console.log(`🏁 Begin renaming ${monorepo_name} to ${new_name}...`)

// Replace all instances of string '{monorepo_name}' from package.json to {new_name}
fs.readFile(
  path.join(__dirname, `../package.json`),
  'utf-8',
  (err, data) => {
    if (err) throw err;
    const result = data
      .replace(new RegExp(monorepo_name, 'g'), new_name)
    fs.writeFile(
      path.join(__dirname, `../package.json`),
      result,
      'utf-8',
      (err) => {
        if (err) throw err;
      })
  }
);

// do the same for all package.json files in packages/apps/* and packages/libs/*
const apps = fs.readdirSync(path.join(__dirname, '../packages/apps'));
apps.forEach((subrepo_name) => {
  fs.readFile(
    path.join(__dirname, `../packages/apps/${subrepo_name}/package.json`),
    'utf-8',
    (err, data) => {
      if (err) throw err;
      const result = data
        .replace(new RegExp(monorepo_name, 'g'), new_name)
      fs.writeFile(
        path.join(__dirname, `../packages/apps/${subrepo_name}/package.json`),
        result,
        'utf-8',
        (err) => {
          if (err) throw err;
          console.log(`✅ packages/apps/* DONE!!`)
        })
    }
  );
})
const libs = fs.readdirSync(path.join(__dirname, '../packages/libs'));
libs.forEach((subrepo_name) => {
  fs.readFile(
    path.join(__dirname, `../packages/libs/${subrepo_name}/package.json`),
    'utf-8',
    (err, data) => {
      if (err) throw err;
      const result = data
        .replace(new RegExp(monorepo_name, 'g'), new_name)
      fs.writeFile(
        path.join(__dirname, `../packages/libs/${subrepo_name}/package.json`),
        result,
        'utf-8',
        (err) => {
          if (err) throw err;
          console.log(`✅ package/libs/* DONE!!`)
        })
    }
  );
})


