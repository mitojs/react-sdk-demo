import React, { useRef } from 'react'
import styled from 'styled-components'
import useGraph from './hooks/useGraph'
import useInitNodes from './hooks/useInitNodes'
import StencilWrap from './Stencil/Stencil'
import './styles/style.less'
// import '@antv/x6-react-shape'
const TopologyCotainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`
const ContentContainer = styled.div`
  flex: 1 1 auto;
  height: 100%;
`
// type PropsTypes = {}
export default function XTopology() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { graphRef } = useGraph({ containerRef, contentRef })
  useInitNodes()

  return (
    <TopologyCotainer>
      <StencilWrap />
      <ContentContainer ref={containerRef}>
        <div ref={contentRef}></div>
      </ContentContainer>
    </TopologyCotainer>
  )
}
