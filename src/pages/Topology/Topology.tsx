import { Graph } from '@antv/x6'
import { useEffect, useRef, useState } from 'react'

export default function Topology() {
  const container = useRef(null)
  const [data, setData] = useState({
    nodes: [
      {
        id: 'node1', // String，可选，节点的唯一标识
        x: 40, // Number，必选，节点位置的 x 值
        y: 40, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        label: '12312', // String，节点标签
      },
      {
        id: 'node2', // String，节点的唯一标识
        x: 160, // Number，必选，节点位置的 x 值
        y: 180, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        label: '测试2', // String，节点标签
      },
    ],
    // 边
    edges: [
      {
        source: 'node1', // String，必须，起始节点 id
        target: 'node2', // String，必须，目标节点 id
      },
    ],
  })
  useEffect(() => {
    const graph = new Graph({
      container: container.current as any,
      width: 800,
      height: 600,
    })
    graph.fromJSON(data)
  }, [data])

  return (
    <div>
      <div ref={container} id='container'></div>
    </div>
  )
}
