import React from 'react'
import { RouterModule } from './router/RouterModule'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ToastProvider } from 'react-toast-notifications'
import './styles/module.scss'

export const App = () => {
    return (
        <Provider store={store}>
            <ToastProvider>
                <RouterModule />
            </ToastProvider>
        </Provider>
    )
}