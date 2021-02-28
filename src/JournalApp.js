import React from 'react'
import { AppRouter } from './router/AppRouter'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ToastProvider } from 'react-toast-notifications'
import './styles/module.scss'

export const JournalApp = () => {
    return (
        <Provider store={store}>
            <ToastProvider>
                <AppRouter />
            </ToastProvider>
        </Provider>
    )
}