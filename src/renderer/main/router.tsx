import { createHashRouter } from 'react-router-dom'
import Layout from './layout'
import Error from './pages/error'
import Home from './pages/home'
import Channel from './pages/channel'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: '/channel',
        element: <Channel />,
        errorElement: <Error />,
      },
    ],
  },
])

export default router
