import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { MitoInstance } from '../mito'
const IframeWrapper = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`
const IframeBreadcurmb = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  useEffect(() => {
    const breadcrumb = MitoInstance.breadcrumb
    let lastLength = -1
    const timer = setInterval(() => {
      const length = breadcrumb.getStack().length
      if (length === lastLength) {
        return
      } else {
        lastLength = length
        iframeRef.current?.contentWindow?.postMessage(
          {
            type: 'breadcrumb',
            data: JSON.parse(JSON.stringify(breadcrumb.getStack())),
          },
          'https://mitojs.github.io'
        )
      }
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return <IframeWrapper title='breadcrumb' ref={iframeRef} src='https://mitojs.github.io/mito-admin-demo/#/breadcrumbDemo'></IframeWrapper>
}

export default IframeBreadcurmb
