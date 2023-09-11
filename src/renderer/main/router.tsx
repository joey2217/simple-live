import { createHashRouter } from 'react-router-dom'
import Layout from './layout'
import Error from './pages/error'
 
const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
  },
])

export default router
