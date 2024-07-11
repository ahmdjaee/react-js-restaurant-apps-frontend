import { RouterProvider } from 'react-router-dom'
import { router } from './router/routes'
import ContextProvider from './context/ContextProvider'
import CrudContextProvider from './context/CrudContextProvider'

function App() {

  return (
    <ContextProvider>
      <CrudContextProvider>
        <RouterProvider router={router} />
      </CrudContextProvider>
    </ContextProvider>
  )
}

export default App
