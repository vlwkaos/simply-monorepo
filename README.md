# Simply Monorepo

Simple opinionated preconfigured monorepo template.

This template utilzes `pnpm workspace` and utility scripts to handle various monorepo such and such.

Includes:

- `typescript`
- `vite`
- `ts-node`

## Directory Structure

```sh
packages/
ㄴ apps/*
ㄴ libs/*

templates/
ㄴ *

tools/
ㄴ *
```

- `packages/apps/*`: for actual running app, be it frontend or backend.
- `packages/libs/*`: for shared libraries.
- `templates/*`: for template used by generator script.
- `tools/*`: contains helper scripts for operating monorepo with an ease.

## Generator

Basic generator script that copies template.

You must provide these three arguments:

- `--type`: app or libs/lib
- `--name`: name of the subrepo
- `--template`: name/directory of the template

```sh  
# Example: 
pnpm run generate --type lib --name my-lib --template lib
```

NOTE: String instances of {monorepo} and {subrepo} will be replaced with the monorepo name and subrepo name respectively

## Workspace tool

```sh
# changes repo names from all package.json
pnpm run rename-repo --name your-repo
```

## Development

```sh
pnpm install
# start dev demo
pnpm start 
```

NOTE: Need to download dependencies for each subrepo (Yet)