import * as log from "https://deno.land/std/log/mod.ts"
import { parse } from "https://deno.land/std/flags/mod.ts"
import { exec } from 'https://deno.land/x/execute/mod.ts'

async function run(){

  try {
    // d: working dir name
    // b: bitbucket repo  
    // g: github repo
    // p: public repo (optional) 
    // a: archive repo (optional) 
    let args = parse(Deno.args)
    
    if (!args.hasOwnProperty('g') || !args.hasOwnProperty('b')) {
      throw new Error('Please input all required argrements')
    }

    const workingDir = !args.d ? '.' : args.d
    const bitbucketRepo = "git@bitbucket.org:" + args.b
    const githubRepo = "git@github.com:" + args.g 

    log.info('Start cloning  '+ bitbucketRepo)

    await exec({
      cmd: ['git', 'clone', '--bare', bitbucketRepo, workingDir],
    })

    log.info('Clone '+ bitbucketRepo + 'is finished');

    let hubCreateCmd: Array<string> = ['hub', 'create', '-p', args.g]
    if (args.p) {
      hubCreateCmd.splice(2, 1);
    }

    log.info('Start creating '+ githubRepo)

    const hubCreatedOutput = await exec({
      cmd: hubCreateCmd,
      cwd: workingDir
    })

    log.info('Gtihub repo is created: ' + hubCreatedOutput);

    log.info('Starting: git push --mirror' + githubRepo)

    await exec({
      cmd: ['git', 'push', `--mirror`, githubRepo],
      cwd: workingDir
    })

    log.info('git push --mirror ' + githubRepo + ' is finished')

    if (args.a){
      log.info('Start archieving repo: ' + githubRepo)
      await exec({
        cmd: ['hub', 'api', 'repos/'+ args.g, '--field', 'archived=true'],
        cwd: workingDir
      })
    }

  } catch (error) {
    log.error(error);
  }

}

run();
