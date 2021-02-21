import React from 'react'
import { AppRouter } from './routers/AppRouter'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ToastProvider } from 'react-toast-notifications'

export const JournalApp = () => {
    return (
        <Provider store={store}>
            <ToastProvider>
                <AppRouter />
            </ToastProvider>
        </Provider>
    )
}
