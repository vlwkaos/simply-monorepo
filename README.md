# Simply Monorepo

Simple opinionated preconfigured monorepo template.

Uses pnpm workspace and has added utility scripts to handle various monorepo such and such.

## Directory Structure

```sh
packages/
ㄴ apps/*
ㄴ libs/*

templates/
ㄴ *
```

- `packages/apps/*`: for actual running app. Be it frontend or backend.
- `packages/libs/*`: for shared libraries
- `templates/*`: for template used by generator script.

## Generator

- WIP

## Development

```sh
pnpm install
# start dev demo
pnpm start 

# make new library from templates directory
pnpm run library:new {library name}
pnpm run library:new kaos-plugin
```

NOTE: Need to download dependencies for each subrepo (Yet)