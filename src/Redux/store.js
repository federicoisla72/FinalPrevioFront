import {configureStore} from '@reduxjs/toolkit'
import reservasReducer from './reservasSlice.js'

export const store = configureStore({
    reducer: {
        reservas : reservasReducer //el estado del post este diponible en la estructura del store
    } //me crer un objeto del store para que maneje el estado de la aplicación y slice que haga (actualizo el estado)
})