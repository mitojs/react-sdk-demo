import { Graph } from '@antv/x6'
import { atomWithReset } from 'jotai/utils'

export const xGraphAtom = atomWithReset<{
  graph: Graph | null
  nodes: any[]
  count: number
}>({
  graph: null,
  count: 0,
  nodes: [
    {
      id: 'node1', // String，可选，节点的唯一标识
      x: 40, // Number，必选，节点位置的 x 值
      y: 40, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: 'attrs label 会覆盖掉', // String，节点标签
      shape: 'rect',
      attrs: {
        body: {
          fill: '#2ECC71',
          stroke: '#000',
          strokeDasharray: '10,2',
        },
        label: {
          text: 'a12312a',
          fill: '#333',
          fontSize: 13,
        },
      },
    },
    {
      id: 'node2', // String，节点的唯一标识
      x: 160, // Number，必选，节点位置的 x 值
      y: 180, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: '测试2', // String，节点标签
      shape: 'ellipse', // 使用 ellipse 渲染
    },
  ],
})
