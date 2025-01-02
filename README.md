# @nekogaming/electron-esbuild

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/thakyZ/electron-esbuild/blob/HEAD/LICENSE)
![@nekogaming/electron-esbuild version](https://img.shields.io/npm/v/@nekogaming/electron-esbuild.svg?label=%20)
![github-actions](https://github.com/thakyZ/electron-esbuild/workflows/CI/badge.svg)
![@nekogaming/electron-esbuild downloads](https://img.shields.io/npm/dm/@nekogaming/electron-esbuild.svg)

Easily integrate `esbuild`/`vite` for your Electron environment.

Based on Kiyozz's [https://github.com/Kiyozz/electron-esbuild](https://github.com/Kiyozz/electron-esbuild)

## Features

- Use of `esbuild` for main source code building
- Use of `vite` for renderer source code building
- HMR for `renderer` and `main` processes
- Full control of your esbuild configuration
- Full control of your vite configuration
- Use electron-builder for final package

## [Getting Started](packages/electron-esbuild/README.md)

## Packages

| Package                                                    | Version                                                                                                                                        |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [@nekogaming/electron-esbuild](packages/electron-esbuild)  | [![electron-esbuild version](https://img.shields.io/npm/v/@nekogaming/electron-esbuild.svg?label=%20)](packages/electron-esbuild/CHANGELOG.md) |
| [@nekogaming/create-electron-esbuild](packages/create-app) | [![create-app version](https://img.shields.io/npm/v/@nekogaming/create-electron-esbuild.svg?label=%20)](packages/create-app/CHANGELOG.md)      |
| [@nekogaming/electron-esbuild-ee](packages/ee)             | ![ee version](https://img.shields.io/npm/v/@nekogaming/electron-esbuild-ee.svg?label=%20)                                                      |

## Development

This repository use node@18 for source code and pnpm workspace

```shell
pnpm i
```
