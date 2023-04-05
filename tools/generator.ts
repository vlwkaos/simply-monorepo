/**
 * Basic generator script
 * Must provide --type, --name, --template
 * --type: app or libs/lib
 * --name: name of the subrepo
 * --template: name of the template
 *  
 * Example: yarn generate --type app --name my-app --template react
 * 
 * String instances of {monorepo} and {subrepo} will be replaced 
 * with the monorepo name and subrepo name respectively
 */
import fs from 'fs';
import path from 'path';

/**
 * 
 * @param arg 
 * @returns 
 */
const parseArg = (arg: string) => {
  const index = process.argv.indexOf(arg);
  return index > -1 ? process.argv[index + 1] : null;
};

// get if it's a library or an app
const lib_or_app = parseArg('--type') === 'app' ? 'app' : 'libs';
if (lib_or_app === null) {
  console.log('⚠️ Please provide a type for the subrepo');
  process.exit(1);
}

// get the name of subrepo from argument
const subrepo_name = parseArg('--name');
if (subrepo_name === null) {
  console.log('⚠️ Please provide a name for the subrepo');
  process.exit(1);
}

// get the name of template from argument
const template_name = parseArg('--template');
if (template_name === null) {
  console.log('⚠️ Please provide a template name');
  process.exit(1);
}

// extract name from package.json
const data = fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
const monorepo_name = data.match(/"name": "(.*)"/)![1];

// copy /templates/{template_name} to /packages/{lib_or_app}/{subrepo_name}
console.log(`⏳ Creating ${lib_or_app}/${subrepo_name} from template ${template_name}...`)
fs.cpSync(
  path.join(__dirname, `../templates/${template_name}`),
  path.join(__dirname, `../packages/${lib_or_app}/${subrepo_name}`), { recursive: true })

// replace all instances of string '{monorepo}' from package.json to {monorepo_name}
fs.readFile(
  path.join(__dirname, `../packages/${lib_or_app}/${subrepo_name}/package.json`),
  'utf-8',
  (err, data) => {
    if (err) throw err;
    const result = data
      .replace(/{monorepo}/g, monorepo_name)
      .replace(/{subrepo}/g, subrepo_name);
    fs.writeFile(
      path.join(__dirname, `../packages/${lib_or_app}/${subrepo_name}/package.json`),
      result,
      'utf-8',
      (err) => {
        if (err) throw err;
        console.log(`✅ DONE!!`)
      })
  }
)


