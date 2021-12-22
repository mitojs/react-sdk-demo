import { Graph } from '@antv/x6'
import { EventNameTypes } from '../constants'
import { BaseClientOptionType, BaseClientType } from '../types/BaseClientType'
import { BaseX6PluginType } from '../types/BaseX6PluginType'
type X6GraphOptions = ConstructorParameters<typeof Graph>[0] & BaseClientOptionType

export class GraphClient implements BaseClientType {
  option?: X6GraphOptions
  constructor(option: X6GraphOptions) {
    //
    this.init()
  }

  use(plugins: BaseX6PluginType<EventNameTypes>[]): void {
    //
  }

  init() {
    //
  }

  destory(): void {
    //
  }

  getOptions(): X6GraphOptions {
    return this.option as X6GraphOptions
  }
}
