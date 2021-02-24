import React from 'react'
import {useSelector} from "react-redux";

export const JournalScreen = () => {

    const {user} = useSelector(state => state.auth)
    return (
        <div>
            JournalScreen
            <p>Welcome back <strong>{user.name}</strong></p>
        </div>
    )
}
