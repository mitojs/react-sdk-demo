import Icon from '../components/Icon'

export default function BaseHeader() {
  return (
    <header className='topbar'>
      <div className='breadcrumb'>
        MitoJS<span>/</span>
        <strong>React 19 演示</strong>
      </div>
      <div className='header-actions'>
        <span className='framework-tag'>React 19</span>
        <a
          className='github-link'
          href='https://github.com/mitojs/react-sdk-demo'
          target='_blank'
          rel='noreferrer'
          aria-label='查看 GitHub 源码'
        >
          <Icon name='github' />
          <span>GitHub</span>
          <Icon name='link' className='external-icon' />
        </a>
      </div>
    </header>
  )
}
