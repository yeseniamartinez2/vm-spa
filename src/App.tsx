import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import { AdminProtectedRoute } from './components/AdminProtectedRoute'
import Home from './components/Home/Home'
import { MenuContainer } from './components/Menu/Menu.container'
const App = () => {
    const { getIdTokenClaims } = useAuth0()
    const [roles, setRoles] = useState('')
    useEffect(() => {
        const getRoles = async () => {
            const roleClaimType = 'https://yeseniatfm.com/roles'
            const claims = await getIdTokenClaims()
            if (claims) setRoles(claims[roleClaimType].roles.toString())
            else setRoles('[]')
        }
        getRoles()
    })

    if (roles === '') return <p>Loading...</p>
    return (
        <>
            <MenuContainer />
            <Routes>
                <Route index element={<Home />} />
                <Route
                    path="/admin/*"
                    element={<AdminProtectedRoute Component={AdminDashboard} roles={roles} />}
                />
            </Routes>
        </>
    )
}

export default App
