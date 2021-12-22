import { Addon } from '@antv/x6'
import { Button } from 'antd'
import consolaGlobalInstance from 'consola'
import { useAtomValue } from 'jotai/utils'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { xGraphAtom } from '../state/atoms'

const StencilContainer = styled.div`
  flex: 0 0 150px;
  height: 100%;
`
const StencilContent = styled.div`
  display: flex;
  padding: 16px;
  flex: 0 0 150px;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  height: 100%;
  align-items: center;
`

const NodeStyle = styled.div`
  border: 2px solid deepskyblue;
  border-radius: 4px;
  width: 100px;
  height: 50px;
  cursor: move;
`
const Dnd = Addon.Dnd

export default function StencilWrap() {
  const [dndInstance, setDndInstance] = useState<Addon.Dnd | null>(null)
  const { graph } = useAtomValue(xGraphAtom)
  const startDrag = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const node = graph?.createNode({
        width: 100,
        height: 50,
        id: 'node3',
        attrs: {
          label: {
            text: 'Rect',
            fill: '#6a6c8a',
          },
          body: {
            stroke: 'deepskyblue',
            strokeWidth: 2,
          },
        },
        ports: {
          groups: {
            group1: {
              attrs: {
                circle: {
                  r: 6,
                  magnet: true,
                  stroke: '#31d0c6',
                  strokeWidth: 2,
                  fill: '#fff',
                },
              },
            },
          },
          items: [
            {
              id: 'port1',
              group: 'group1', // 指定分组名称
            },
            {
              id: 'port2',
              group: 'group1', // 指定分组名称
            },
            {
              id: 'port3',
              group: 'group1', // 指定分组名称
            },
          ],
        },
      })
      node && dndInstance?.start(node, e.nativeEvent)
    },
    [dndInstance, graph]
  )

  useEffect(() => {
    if (!graph) return
    const dnd = new Dnd({
      target: graph,
      scaled: false,
      animation: true,
      validateNode(droppingNode, options) {
        return droppingNode.shape === 'html'
          ? new Promise<boolean>(resolve => {
              // const { draggingNode, draggingGraph } = options
              // const view = draggingGraph.findView(draggingNode)
              // const contentElem = view.findOne('foreignObject > body > div')
              // Dom.addClass(contentElem, 'validating')
              setTimeout(() => {
                // Dom.removeClass(contentElem, 'validating')
                resolve(true)
              }, 3000)
            })
          : true
      },
      //防止重置Id
      // getDragNode: node => node.clone({ keepId: true }),
      // getDropNode: node => node.clone({ keepId: true }),
    })
    setDndInstance(dnd)
  }, [graph])

  const onClick = () => {
    console.log('graph data')
    consolaGlobalInstance.info(graph?.toJSON())
  }

  return (
    <StencilContainer>
      <StencilContent>
        <NodeStyle onMouseDown={startDrag}></NodeStyle>
        <Button style={{ marginTop: '20px' }} onClick={onClick}>
          打印数据
        </Button>
      </StencilContent>
    </StencilContainer>
  )
}
