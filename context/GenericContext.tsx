import React, { createContext, PropsWithChildren, useState } from 'react'
import { PromoterDataI } from '../interfaces/promoter.interfaces'


interface ContextData {
    currentPromoter: PromoterDataI | undefined
    changeCurrentPromoter: (promoter: PromoterDataI) => void;
}

export const GenericContext = createContext<ContextData>({
    currentPromoter: undefined,
    changeCurrentPromoter: () => {}
})


export const GenericContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [currentPromoter, setCurrentPromoter] = useState<PromoterDataI | undefined>(undefined)

  const changeCurrentPromoter = (promoter: PromoterDataI) =>{
    setCurrentPromoter(promoter)
  }


  return (
    <GenericContext.Provider
      value={{
        currentPromoter,
        changeCurrentPromoter
      }}
    >
      {props.children}
    </GenericContext.Provider>
  )
}
