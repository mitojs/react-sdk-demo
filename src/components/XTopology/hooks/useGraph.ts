import { Graph } from '@antv/x6'
import React, { useEffect, useRef } from 'react'
import consola from 'consola'
import { useUpdateAtom, useAtomValue } from 'jotai/utils'
import { xGraphAtom } from '../state/atoms'
import { debounce } from 'lodash'
import { graphStyle } from '../constants/graph'

type X6GraphOptions = ConstructorParameters<typeof Graph>[0]

type PropsType = {
  containerRef: React.RefObject<HTMLDivElement>
  contentRef: React.RefObject<HTMLDivElement>
  minimapBoxRef?: React.RefObject<HTMLDivElement>
}

const GraphSetting: X6GraphOptions = {
  background: {
    color: graphStyle.background,
  },
  grid: {
    size: 6, // 网格大小 10px
    visible: true, // 渲染网格背景
  },
}

export default function useGraph({ containerRef, contentRef, minimapBoxRef }: PropsType) {
  const graphRef = useRef<Graph>()

  const updateGraphState = useUpdateAtom(xGraphAtom)
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return
    graphRef.current = new Graph({
      ...GraphSetting,
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      container: contentRef.current,
      history: true,
      // 对齐线： https://x6.antv.vision/zh/docs/tutorial/basic/snapline
      snapline: {
        enabled: true,
        sharp: true,
      },
      // 滚动： https://x6.antv.vision/zh/docs/tutorial/basic/scroller/
      // scroller: {
      //   enabled: true,
      //   pageVisible: false,
      //   pageBreak: false,
      //   pannable: true,
      // },
      selecting: {
        enabled: true,
        className: 'node-selecting',
        showNodeSelectionBox: true,
      },
    })

    updateGraphState(prev => ({
      ...prev,
      graph: graphRef.current as Graph,
    }))

    const resize = debounce(() => {
      graphRef.current?.resizeGraph(containerRef.current?.clientWidth, containerRef.current?.clientHeight)
    }, 300)
    window.addEventListener('resize', resize)
    return () => {
      consola.info('x6 graph destroied')
      window.removeEventListener('resize', resize)
      graphRef.current?.dispose()
    }
  }, [containerRef, contentRef, updateGraphState])

  return { graphRef }
}
