import ApartsStore from "./aparts.store";
import React from 'react'

export function createStore() {
    const apartsStore = new ApartsStore()
    return {
        apartsStore
    }
}

export const AppContext = React.createContext()