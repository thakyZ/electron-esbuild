/*
 * Copyright (c) 2024 Kiyozz.
 *
 * All rights reserved.
 */

import { BuildOptions } from 'esbuild'
import { type InlineConfig } from 'vite'

import { Configurator } from './configurators/base.configurator.js'
import { EsbuildConfigurator } from './configurators/esbuild.configurator.js'
import { ViteConfigurator } from './configurators/vite.configurator.js'
import { Target, TypeConfig } from './enums.js'
import {
  MainPossibleConfiguration,
  PossibleConfiguration,
  RendererPossibleConfiguration,
} from './types.js'
import { YamlItem } from './yaml.js'
import { EsbuildBuilder } from '../builder/esbuild.builder.js'
import { ViteBuilder } from '../builder/vite.builder.js'
import { Builder } from '../builder.js'
import { unsupportedType } from '../console.js'

export type EnvOutput = {
  dir: string
  filename: string
}

export class EnvConfig {
  readonly type: TypeConfig
  readonly path: string
  readonly src: string
  readonly output: EnvOutput
  readonly html?: string

  constructor({
    type,
    path,
    src,
    output,
    html,
  }: {
    type: TypeConfig
    path: string
    src: string
    output: EnvOutput
    html?: string
  }) {
    this.type = type
    this.path = path
    this.src = src
    this.output = output
    this.html = html
  }

  static fromYaml(yaml: YamlItem): EnvConfig {
    return new this({
      type: yaml.type,
      path: yaml.path,
      src: yaml.src,
      output: yaml.output,
      html: yaml.html,
    })
  }

  toConfigurator() {
    switch (this.type) {
      case TypeConfig.esbuild:
        return new EsbuildConfigurator(this) as Configurator<TypeConfig>
      case TypeConfig.vite:
        return new ViteConfigurator(this) as Configurator<TypeConfig>
      default:
        unsupportedType(this.type)
    }
  }
}

export class ConfigItem<
  T extends PossibleConfiguration | null = PossibleConfiguration,
  F extends EnvConfig | null = EnvConfig | null,
> {
  readonly config: T
  readonly fileConfig: F
  readonly target: Target
  readonly isVite: boolean
  readonly isEsbuild: boolean
  readonly isMain: boolean
  readonly isRenderer: boolean

  constructor({
    config,
    fileConfig,
    target,
  }: {
    config: T
    fileConfig: F
    target: Target
  }) {
    this.config = config
    this.fileConfig = fileConfig
    this.target = target
    this.isVite = this.fileConfig?.type === TypeConfig.vite
    this.isEsbuild = this.fileConfig?.type === TypeConfig.esbuild
    this.isMain = this.target === Target.main
    this.isRenderer = this.target === Target.renderer
  }

  async toBuilderAsync(): Promise<Builder | null> {
    if (this.isEsbuild) {
      return new EsbuildBuilder(this as ConfigItem<BuildOptions[]>)
    } else if (this.isVite) {
      return await ViteBuilder.create(this as ConfigItem<InlineConfig>)
    }

    if (this.fileConfig !== null) {
      unsupportedType(this.fileConfig.type, this.isMain ? 'main' : 'renderer')
    }

    return null
  }
}

export class Config<
  M extends MainPossibleConfiguration,
  R extends RendererPossibleConfiguration,
> {
  readonly main: ConfigItem<M, EnvConfig>
  readonly renderer: ConfigItem<R | null>

  constructor({
    main,
    renderer,
  }: {
    main: ConfigItem<M, EnvConfig>
    renderer: ConfigItem<R | null>
  }) {
    this.main = main
    this.renderer = renderer
  }

  async toBuildersAsync(): Promise<readonly [Builder, Builder | null]> {
    return [
      (await this.main.toBuilderAsync()) as Builder,
      await this.renderer.toBuilderAsync(),
    ]
  }
}
