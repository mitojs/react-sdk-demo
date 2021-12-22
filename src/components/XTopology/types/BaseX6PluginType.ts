import { EventArgs } from '@antv/x6/lib/graph/events'
import { EventNameTypes } from '../constants'
import { BaseClientType } from './BaseClientType'

export interface BaseX6PluginType<T extends EventNameTypes, C extends BaseClientType = BaseClientType> {
  // 事件枚举
  name: T
  // 拿到x6触发事件后的数据，并在transform中进行数据转换并返回
  transform?: (args: EventArgs[T]) => any
  // 拿到转换后的数据进行一系列的操作
  consumer?: (this: C, transformedData: any) => void
}
