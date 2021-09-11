import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { WindowType } from '..'
const IframeWrapper = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`
const IframeBreadcurmb = () => {
  const iframeRef = useRef(null)
  useEffect(() => {
    let iframe = iframeRef.current as any
    const breadcrumb = (window as any as WindowType).MitoInstance.breadcrumb
    let lastLength = -1
    setInterval(() => {
      const length = breadcrumb.getStack().length
      if (length === lastLength) {
        return
      } else {
        lastLength = length
        iframe.contentWindow &&
          iframe.contentWindow.postMessage(
            {
              type: 'breadcrumb',
              data: JSON.parse(JSON.stringify(breadcrumb.getStack())),
            },
            'https://mitojs.github.io/mito-admin-demo/#/breadcrumbDemo'
          )
      }
    }, 1000)
  }, [])
  return <IframeWrapper title='breadcrumb' ref={iframeRef} src='https://mitojs.github.io/mito-admin-demo/#/breadcrumbDemo'></IframeWrapper>
}

export default IframeBreadcurmb
