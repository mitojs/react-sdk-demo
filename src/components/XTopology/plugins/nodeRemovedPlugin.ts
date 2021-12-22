import { NodeEventNameTypes } from '../constants/graph'
import { BaseX6PluginType } from '../types/BaseX6PluginType'

const name = NodeEventNameTypes.NodeRemoved
export const nodeRemovedPlugin: BaseX6PluginType<typeof name> = {
  name: NodeEventNameTypes.NodeRemoved,
  transform(args) {
    console.log(args)
  },
  consumer(transformData) {
    console.log('transformData', transformData)
  },
}
