/**
 * --name: name of the subrepo
 */
import fs from 'fs';
import path from 'path';
import { parseArg, replaceTextInFile } from './util';

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
replaceTextInFile('../package.json', [{ from: monorepo_name, to: new_name }])

// do the same for all package.json files in packages/apps/* and packages/libs/*
const apps = fs.readdirSync(path.join(__dirname, '../packages/apps'));
apps.forEach((subrepo_name) => {
  replaceTextInFile(`../packages/apps/${subrepo_name}/package.json`, [{ from: monorepo_name, to: new_name }])
})
const libs = fs.readdirSync(path.join(__dirname, '../packages/libs'));
libs.forEach((subrepo_name) => {
  replaceTextInFile(`../packages/libs/${subrepo_name}/package.json`, [{ from: monorepo_name, to: new_name }])
})


