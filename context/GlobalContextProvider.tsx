import { ApiContextProvider } from './apiContext'
import { GenericContextProvider } from './GenericContext'

const GlobalContextProvider = (props: any) => {
  return (
    <ApiContextProvider>
      <GenericContextProvider>
        {props.children}
      </GenericContextProvider>
    </ApiContextProvider>
  )
}

export default GlobalContextProvider
