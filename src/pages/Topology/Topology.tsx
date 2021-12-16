import { Graph, Addon, Dom } from '@antv/x6'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const TopologyCotainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

const TopologyDragWrap = styled.div`
  display: flex;
  padding: 16px;
  flex: 0 0 150px;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  align-items: center;
`

const NodeStyle = styled.div`
  border: 2px solid deepskyblue;
  width: 100px;
  height: 50px;
  cursor: move;
`

const Dnd = Addon.Dnd

export default function Topology() {
  const container = useRef(null)
  const graph = useRef<Graph | null>(null)
  const dnd = useRef<Addon.Dnd | null>(null)
  const [data, setData] = useState({
    nodes: [
      {
        id: 'node1', // String，可选，节点的唯一标识
        x: 40, // Number，必选，节点位置的 x 值
        y: 40, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        label: '12312', // String，节点标签
        shape: 'rect',
        attrs: {
          body: {
            fill: '#2ECC71',
            stroke: '#000',
            strokeDasharray: '10,2',
          },
          label: {
            text: 'Hello',
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
    // 边
    edges: [
      {
        source: 'node1', // String，必须，起始节点 id
        target: 'node2', // String，必须，目标节点 id
        attrs: {
          line: {
            stroke: 'blue',
          },
        },
        shape: 'double-edge',
      },
    ],
  })
  useEffect(() => {
    graph.current = new Graph({
      container: container.current as any,
      width: 800,
      height: 600,
      background: {
        color: '#fffbe6',
      },
      grid: {
        size: 6, // 网格大小 10px
        visible: true, // 渲染网格背景
      },
    })
    graph.current.fromJSON(data)
    graph.current.on('cell:click', ({ e, x, y, cell, view }) => {
      console.log('cell:click', e, x, y, cell, view)
    })

    graph.current.on('node:click', ({ e, x, y, cell, view, node }) => {
      console.log('node:click', e, x, y, cell, view)
      node.attr('body/stroke', 'orange')
    })

    graph.current.on('graph:mouseenter', args => {
      console.log('graph:mouseenter', args)
    })

    dnd.current = new Dnd({
      target: graph.current,
      scaled: false,
      animation: true,
      validateNode(droppingNode, options) {
        return droppingNode.shape === 'html'
          ? new Promise<boolean>(resolve => {
              const { draggingNode, draggingGraph } = options
              const view = draggingGraph.findView(draggingNode)!
              const contentElem = view.findOne('foreignObject > body > div')
              Dom.addClass(contentElem, 'validating')
              setTimeout(() => {
                Dom.removeClass(contentElem, 'validating')
                resolve(true)
              }, 3000)
            })
          : true
      },
    })
    return () => {
      dnd.current && dnd.current.dispose()
    }
  }, [])

  const startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const node = graph.current?.createNode({
      width: 100,
      height: 50,
      attrs: {
        label: {
          text: 'Rect',
          fill: '#6a6c8a',
        },
        body: {
          stroke: '#31d0c6',
          strokeWidth: 2,
        },
      },
    })

    node && dnd.current?.start(node, e.nativeEvent)
  }

  return (
    <TopologyCotainer>
      <TopologyDragWrap>
        <NodeStyle onMouseDown={startDrag}></NodeStyle>
      </TopologyDragWrap>
      <div ref={container} id='container'></div>
    </TopologyCotainer>
  )
}
