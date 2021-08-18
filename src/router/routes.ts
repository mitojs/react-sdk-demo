import PageOne from '../pages/PageOne/PageOne'
import PageTwo from '../pages/PageTwo'

const routes = [
  {
    path: '/page-one',
    component: PageOne,
    meta: {
      title: '示例页面一',
    },
  },
  {
    path: '/page-two',
    component: PageTwo,
    meta: {
      title: '示例页面二',
    },
  },
]

export default routes
