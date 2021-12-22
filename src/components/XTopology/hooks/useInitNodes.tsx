import { useAtomValue } from 'jotai/utils'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { React_Shape } from '../constants/graph'
import { xGraphAtom } from '../state/atoms'
const NodeWrap = styled.div`
  width: 100px;
  height: 50px;
  border-radius: 5px;
  text-align: center;
  line-height: 50px;
  border: 2px solid deepskyblue;
  border-radius: 4px;
  background-color: white;
`
const Content = ({ name }: { name: string }) => <NodeWrap>{name}</NodeWrap>
const data = {
  nodes: [
    {
      id: 'node1', // String，可选，节点的唯一标识
      x: 40, // Number，必选，节点位置的 x 值
      y: 40, // Number，必选，节点位置的 y 值
      width: 100, // Number，可选，节点大小的 width 值
      height: 50, // Number，可选，节点大小的 height 值
      // shape: React_Shape,
      // label: 'attrs label 会覆盖掉', // String，节点标签
      // attrs: {
      //   body: {
      //     fill: '#2ECC71',
      //     stroke: '#000',
      //     strokeDasharray: '10,2',
      //   },
      //   label: {
      //     // text: '初始化节点一',
      //     fill: '#333',
      //     fontSize: 13,
      //   },
      // },
      data: {
        name: '节点一',
      },
      // component(node) {
      //   return <Content name={node.data.name} />
      // },
    },
    {
      id: 'node2', // String，节点的唯一标识
      x: 160, // Number，必选，节点位置的 x 值
      y: 180, // Number，必选，节点位置的 y 值
      width: 100, // Number，可选，节点大小的 width 值
      height: 50, // Number，可选，节点大小的 height 值
      // shape: React_Shape, // 使用 ellipse 渲染
      data: {
        name: '节点二',
      },
      // component(node) {
      //   return <Content name={node.data.name} />
      // },
    },
  ],
  // 边
  edges: [
    {
      source: 'node1', // String，必须，起始节点 id
      target: 'node2', // String，必须，目标节点 id
      attrs: {
        line: {
          stroke: 'deepskyblue',
        },
      },
      shape: 'edge',
    },
  ],
}

export default function useInitNodes() {
  const { graph } = useAtomValue(xGraphAtom)
  useEffect(() => {
    if (!graph) return
    graph.fromJSON(data)
    // graph.addNode({
    //   x: 40,
    //   y: 40,
    //   width: 100,
    //   height: 100,
    //   shape: 'react-shape',
    //   component(node) {
    //     return <Content />
    //   },
    // })
  }, [graph])
}
