export const graphStyle = {
  // 背景颜色
  background: 'rgb(242,243,244)',
}

export const GROUP_HORIZONTAL__PADDING = 24 // 分组横向 padding
export const GROUP_VERTICAL__PADDING = 40 // 分组纵向 padding
export const NODE_WIDTH = 180
export const NODE_HEIGHT = 32

export const React_Shape = 'react-shape'

export enum NodeEventNameTypes {
  // node
  NodeClick = 'node:click',
  NodeRemoved = 'node:removed',
  NodeContextMenu = 'node:contextmenu',
  NodeMouseEnter = 'node:mouseenter',
  NodeMouseLeave = 'node:mouseleave',
}

export enum EdgeEventNameTypes {
  EdgeClick = 'edge:click',
}
