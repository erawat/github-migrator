# Github migrator

Github migrator is a little helper that wraps git and hub commands and makes migrating a repository from Bitbucket to Github easier.

### Prerequisites

The Github migrator requires follow tools pre-installed: 

* Deno
* Git
* [Hub](https://github.com/github/hub) 

### Usage

``` bash
$ deno run --allow-run migrator.ts \ 
-g <github_org/username>/<repo_name> \
-b <workspace_id>/<repo_name> 
```

### Arguments 

* b: Bitbucket repository.  
* g: Github repository.
* d: Working directory. (optional)
* p: Make the repository public after migrated.(optional)
* a: Archive the repository after migrated (optional) 
