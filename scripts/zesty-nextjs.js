// run script: node scripts/zesty-nextjs.js 
// reach out to zesty's url map
// create file structure that maps over the zesty instance
// in each file, create the script to load props into the file

// pseudo code

// BUILDING COMPONENTS
// map through each content model: use /-/instant/
// get content model that matches the model of above item requested
// create the file for the content model 


// DYNAMICALLY LOAD COMPONENTS INTO PAGE
// map through the uri requested
// request the ?toJSON endpoint of the current request path part
// get the content model zuid: meta > model > zuid 
// load the content model component into the page

// COMPONENT FILE
// pass a full content obj of item from ?toJSON response
// component file will now have passed object to call data within its file
// 


// lives as a script file (zesty-config.js ?)
// for now: can use password param for preview url (readonly)
// if it creates developer token, need to account for token expiration
// 0b include needed packages
const fetch = require('node-fetch');
const fs = require("fs") // need to check folder and write files
const chalk = require('chalk');
const { promisify } = require('util');
const { exit } = require("process");
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
const mkdirSync = promisify(fs.mkdir)
// access doesnt promisfy, needs a custom function
const accessAsync = (s) => new Promise(r => fs.access(s, fs.F_OK, e => r(!e)))
//console output shorthands
const successMark =         `      ${chalk.gray.bold('[')}${chalk.green.bold('V')}${chalk.gray.bold(']')}`
const failMark =            `      ${chalk.gray.bold('[')}${chalk.red.bold('X')}${chalk.gray.bold(']')}`
const warningMark =         `      ${chalk.gray.bold('[')}${chalk.yellow.bold('O')}${chalk.gray.bold(']')}`
const stageMark = (num) =>  `   ${chalk.gray.bold('[')}${chalk.white.bold(num)}${chalk.gray.bold(']')}`

// 0a
// these env var values can be extracted from an initial login, but for now we will 
// prepopulate to get started faster

// set domain, consider that domains have password protection
// create next js config is missing
// add zesty env to it
// if zesty env missing from js config, add it and instrcut user to populate it
async function accessNextConfig(){
    let configPath = process.cwd() +'/next.config.js'

    // check if next config is there
    let configExists = await accessAsync(configPath)
    if(!configExists){
        console.log(warningMark + ' Missing NextJS Config, attempting to create the file')
        let fileContents = `
module.exports = {
    env: {
        zesty: {
            "stage" : "", // e.g. https://XYZ-dev.webengine.zesty.io
            "production" : "", // e.g. https://www.acme.com
            "stage_password" : "",
            "auth" : "", // this can set APP_SID as cookie to get access, or a user login
            "src_dir" : "/src" // where the next project has pages, components, etc folders
        }
    }
}
          `;
          try{
            await writeFileAsync(configPath, fileContents)
          } catch(e) {
              console.log(e)
              exit();
          }
    }
    
    const nextJSConfig = require(configPath)
    if(!nextJSConfig.env.hasOwnProperty('zesty')){
        console.log(failMark + ' Missing Zesty env NextJS Config, please add the following to your nextjs.config.js')
        console.log(chalk.green.bold('          env: {'));
        console.log(chalk.green.bold('             zesty: {'));
        console.log(chalk.green.bold('                 "stage" : "", // stage domain to zesty instance'));
        console.log(chalk.green.bold('                 "production" : "", // stage domain to zesty instance'));
        console.log(chalk.green.bold('                 "stage_password" : "",'));
        console.log(chalk.green.bold('                 "auth" : ``, // this can set APP_SID as cookie to get access, or a user login'));
        console.log(chalk.green.bold('                 "src_dir" : "/src"'));
        console.log(chalk.green.bold('              }'));
        console.log(chalk.green.bold('         }'));
        return false;
    }

    return nextJSConfig.env.zesty;
}



// 1
// spot check variables and 

async function checkVariables(config){
    // verify https is or isnt there
    
    // output the working directory
    console.log(`${successMark} Working Project Directory: ${chalk.blue.bold(process.cwd())}`);
    const workingDir = process.cwd();
    const srcDir = workingDir + config.src_dir
    let success = true;
    // verify the src_dir exists and is a folder
    success = await accessAsync(srcDir)
    if(success) {
        console.log(`${successMark} Source directory found: ${chalk.blue.bold(srcDir)}`)
    } else {
        console.log(`${failMark} src_dir does not exist: ${srcDir}`);
        success = false
    }
    
    // check the domain variables
    success = await accessAsync(srcDir+'/components/')
    if(success) {
        console.log(`${successMark} Components directory found: ${chalk.blue.bold(`${srcDir}/components`)}`)
    } else {
        console.log(`${failMark} ${srcDir}/components/ directory missing, did you setup NextJS correct?`);
        success = false
    }

    // check the domain variables
    // stage check
    if(config.hasOwnProperty('stage') && config.stage !== ''){
        console.log(`${successMark} Stage value present: ${chalk.blue.bold(config.stage)} `);
    } else {
        console.log(chalk.red.bold(`${failMark} 'stage' value missing or empty, set this value to your zesty stage domain e.g. https://xyz-dev.preview.zesty.io`));
        success = false
    }
    // production check
    if(config.hasOwnProperty('production') && config.production !== ''){
        console.log(`${successMark} Production value present: ${chalk.blue.bold(config.production)} `);
    } else {
        console.log(chalk.red.bold(`${failMark} 'production' value missing, set this value to your zesty production domain e.g. https://www.acme.com`));
        success = false
    }

    // stage password check
    if(config.hasOwnProperty('stage_password') && config.stage_password !== ''){
        console.log(`${successMark} Stage password present: ${chalk.blue.bold('*******')} `);
    } else {
        console.log(`${warningMark} ${chalk.yellow.bold('Warning!')} No stage password present, this may cause issues if your zesty instance is password protected.`);
    }

    return success;

}

// 2
// Check network connections and available modes
async function checkNetworkConnectionsAndModes(config){
    let success = true;
    // make network request to ensure the headless or hybrid mode is turned on, return errors or docs otherwise
    // note at this point, the CLI cannot verify, ask for sign in, and make the setting change via the api (TODO:but it will!)
    let stage200URL = formURLWithPassword(config.stage,'',config.stage_password)
    let res = await fetch(stage200URL)
    if(res.status == 200){
        console.log(`${successMark} Stage URL accessible`);
    } else {
        console.log(`${failMark} Stage URL did not respond with a 200.`);
        success = false;
    }
    // check if /-/headless/ is available

    stageHeadlessURL = formURLWithPassword(config.stage,'/-/headless/',config.stage_password)
    res = await fetch(stageHeadlessURL)
    if(res.status == 200){
        console.log(`${successMark} Hybrid/Headless Mode is accessible`);
    } else {
        console.log(`${failMark} Hybrid/Headless mode needs to be turned on in the instance's setting.`);
        success = false;
    }

    let prod200URL = config.production
    res = await fetch(prod200URL)
    if(res.status == 200){
        console.log(`${successMark} Production URL accessible`);
    } else {
        console.log(`${failMark} Production URL did not respond with a 200.`);
        success = false;
    }

    let prodHeadlessURL = formURLWithPassword(config.production,'/-/headless/')
    res = await fetch(prodHeadlessURL)
    if(res.status == 200){
        console.log(`${successMark} Production Hybrid/Headless Mode is accessible`);
    } else {
        console.log(`${failMark} Production Hybrid/Headless mode needs to be turned on in the instance's setting.`);
        success = false;
    }

    return success;

}
// helper functions
function formURLWithPassword(domain,path,password=''){
    let url = domain + path
    return (password != '') ? url + '?_zpw=' + password : url
}

function finalErrorOutput(message){
    console.log(`   ${chalk.red.bold('-----------------------------------------------------------------------------')}`)
    console.log(`    ${chalk.red.bold(message)} `)
    console.log(`   ${chalk.red.bold('-----------------------------------------------------------------------------')}`)
}

// 3
// hit gql end point ${domain_stage}/-/gql/ to access the models to create the base components and index.js list
// mkdir ${src_dir}/components
// use a javascript started template to start it
// use the models fields maplist in a premade comment to help the developer
// File Example Homepage.js
    // a. comment saying this is a zesty component, link to docs, show fields and model info, also other info on relationships
    // b. File, loop through 
    /**
     function Homepage({content}) {
        return (
            <>
            <h2 dangerouslySetInnerHTML={{__html:content.title}}></h2>
            <div dangerouslySetInnerHTML={{__html:content.content}}></div>
            </>
        );
        };

        export default Homepage;
     */
async function createFiles(config){
    let success = true; // success until fail
    
    let componentDirectory = process.cwd() + config.src_dir + '/components'
    let zestyModelsDirectory = process.cwd() + config.src_dir + '/components/zesty-models'
    
    // make zesty-models dir if missing
    success = await accessAsync(zestyModelsDirectory)
    if(!success){
        console.log(`${successMark} Creating Directory for Zesty Models: ${zestyModelsDirectory}`);
        success = await mkdirSync(zestyModelsDirectory)
    } else {
        console.log(`${successMark} Zesty Models Exists: ${zestyModelsDirectory}`);
    }

    // this json endpoint is to map all models 
    let stageGQLEndpoint = formURLWithPassword(config.stage,'/-/gql/',config.stage_password)
    let res = await fetch(stageGQLEndpoint)
    let data = await res.json();
    // capture models to memory 
    let models = data.models;
    console.log(`${successMark} ${data.models.length} Zesty Models Accessed. Creating missing files. `);
    
    // iterate through each { models: [] } and create a file with the gqlModelName
    let componentAppendName = 'ZestyModel';
    models.forEach(model, async function(model){
        console.log(model)
    })
   
    //console.log(data.models)
    return success

}


// 0
// Run Function connects all functions and outputs console logs 

async function run(){
    // load config
    const config = await accessNextConfig() 
    if(config == false) exit();
    
    console.log(config)

    // terminal output of start
    console.log(`${chalk.gray.bold(' ')}`)
    console.log(`   ${chalk.gray.bold('-----------------------------------------------------------------------------')}`)
    console.log(`                          ${chalk.hex('#FF5D0A').bold('Zesty.io')} ${chalk.gray.bold('NextJS')} Integration Script Running`)
    console.log(`   ${chalk.gray.bold('-----------------------------------------------------------------------------')}`)
    console.log(`${chalk.gray.bold(' ')}`)

    // Step 1 config check
    console.log(stageMark(1)+ ' Config Check')
    const configCheckSuccess = await checkVariables(config)

    if (!configCheckSuccess){
        finalErrorOutput(' Config is not setup properly. Verify the values in your next.config.js under the `zesty` object.')
        exit()
    }

    // Step 2 Network Check
    console.log(stageMark(2)+ ' Network Check')
    const networkCheckSuccess = await checkNetworkConnectionsAndModes(config)
    if (!networkCheckSuccess){
        finalErrorOutput('Network tests failed to verified URLs are Zesty.io instance with Headless or Hybrid mode on')
        exit()
    }

    // Step 3 Create 
    console.log(stageMark(3)+ ' File Creation')
    const createFileSuccess = await createFiles(config)
    if (!createFileSuccess){
        finalErrorOutput('File creation failed. Check your working directory is correct, and that the script has file write access.')
        exit()
    }
}

run();





// 4 create components/index.js 
// this file imports all the files we created, which is used a single import on the page files
        /** File Example
         *  index.js
            
            import Homepage from './Homepage'
            
            export {
                Homepage
            }
         */

// 5 create the catch all dynamic route
// [[...slug]].js
// https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes
 /** File Example
  * 
  import { useRouter } from 'next/router'
  import * as Zesty from '../components/zesty-models'

const Comment = () => {
  const router = useRouter()
  const slug = router.query.slug || []

  return (
    <>
      <Header />
      <h1>Slug: {slug.join('/')}</h1>
    </>
  )
}

export default Comment
  * 
  */


// 6 Create ZestyBrowser component which shows in dev instances the model and fields and lets you browse through other model/fields
// this overlay exists on page


// FILTERING THROUGH DATA
// TODO: filtering through zesty items (currently work in progress to be available in rest api)
// for now: create custom endpoints in instance using parsley