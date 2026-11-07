import { useState } from 'react'
import { animated, config, useSpring } from '@react-spring/web'
import Icon from './Icon'
import { setNotice } from '../monitoring/store'

export default function Counter() {
  const [count, setCount] = useState(0)
  const { number } = useSpring({ from: { number: 0 }, number: count, config: config.molasses })
  function changeCount(delta: number) {
    setCount((value) => value + delta)
    setNotice(`计数已更新，点击行为已记录。`)
  }
  return (
    <article className='card counter-card'>
      <div className='card-label'>
        <Icon name='activity' />
        <span>交互计数器</span>
        <span className='tiny-tag'>DOM</span>
      </div>
      <div className='counter-controls'>
        <div>
          <animated.strong data-testid='counter'>{number.to((value) => value.toFixed(1))}</animated.strong>
          <span>次交互计数</span>
        </div>
        <div className='counter-buttons'>
          <button className='square-button' aria-label='减少计数' onClick={() => changeCount(-1)}>
            <Icon name='minus' />
          </button>
          <button className='square-button' aria-label='增加计数' onClick={() => changeCount(1)}>
            <Icon name='plus' />
          </button>
        </div>
      </div>
      <p className='muted'>点击按钮，查看行为轨迹中的变化。</p>
    </article>
  )
}
