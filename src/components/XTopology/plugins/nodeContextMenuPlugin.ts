import { NodeEventNameTypes } from '../constants/graph'
import { BaseX6PluginType } from '../types/BaseX6PluginType'

const name = NodeEventNameTypes.NodeClick
export const nodeContextMenu: BaseX6PluginType<typeof name> = {
  name: NodeEventNameTypes.NodeClick,
  transform(args) {
    console.log(args)
  },
  consumer(transformData) {
    console.log('transformData', transformData)
  },
}
