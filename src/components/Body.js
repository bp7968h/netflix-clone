import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Login'
import Browse from './Browse'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'


const Body = () => {
    const dispatch = useDispatch()
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/browse',
            element: <Browse />
        }
    ])

    useEffect(() => {
        console.log('registered')
        onAuthStateChanged(auth, (user) => {
            console.log('fired')
            if (user) {
                //User is signed in
                const { uid, email, displayName } = user;
                dispatch(addUser({ uid, email, displayName }))
            } else {
                // User is signed out
                dispatch(removeUser())
            }
        });
    }, [])

    return (<RouterProvider router={appRouter} />)
}

export default Body