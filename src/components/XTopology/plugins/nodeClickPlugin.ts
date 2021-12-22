import { NodeEventNameTypes } from '../constants/graph'
import { BaseX6PluginType } from '../types/BaseX6PluginType'

const name = NodeEventNameTypes.NodeContextMenu
export const nodeClickPlugin: BaseX6PluginType<typeof name> = {
  name,
  transform(args) {
    console.log(args)
  },
  consumer(transformData) {
    console.log('transformData', transformData)
  },
}
