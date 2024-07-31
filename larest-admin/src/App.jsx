import { RouterProvider } from 'react-router-dom'
import { router } from './router/routes'
import ContextProvider from './context/ContextProvider'
import CrudContextProvider from './context/CrudContextProvider'
import TopBarProgress from 'react-topbar-progress-indicator'

function App() {

  return (
    <ContextProvider>
      <CrudContextProvider>
        <RouterProvider fallbackElement={<TopBarProgress />} router={router} />
      </CrudContextProvider>
    </ContextProvider>
  )
}

export default App
