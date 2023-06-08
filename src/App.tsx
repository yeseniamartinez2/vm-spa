import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import { AdminProtectedRoute } from './components/AdminProtectedRoute'
import AdoptionRequestForm from './components/AdoptionRequestForm/AdoptionRequestForm.component'
import { Footer } from './components/Footer'
import Home from './components/Home/Home'
import { MenuContainer } from './components/Navigation/Menu.container'
import Payment from './components/Payment/Payment.component'
import PaymentConfirmation from './components/Payment/PaymentConfirmation.component'
import { PetDetailContainer } from './components/PetDetail/PetDetail.container'
import { PetListContainer } from './components/PetList/PetList.container'

const App = () => {
    const { getIdTokenClaims, user } = useAuth0()
    const [roles, setRoles] = useState('')

    const options = {
        // passing the client secret obtained from the server
        clientSecret: process.env.STRIPE_SECRET,
    }

    useEffect(() => {
        const getRoles = async () => {
            const roleClaimType = 'https://yeseniatfm.com/roles'
            const claims = await getIdTokenClaims()
            if (claims) setRoles(claims[roleClaimType].roles.toString())
            else setRoles('[]')
        }
        getRoles()
    })

    return (
        <>
            <MenuContainer roles={roles} email={user?.email} />
            <Routes>
                <Route index element={<Home />} />
                <Route
                    path="/admin/*"
                    element={<AdminProtectedRoute Component={AdminDashboard} roles={roles} />}
                />
                <Route path="pets/" element={<PetListContainer />} />
                <Route path="pets/:petId" element={<PetDetailContainer />} />
                <Route path="adoption-request" element={<AdoptionRequestForm />} />
                <Route path="payment" element={<Payment />} />
                <Route path="confirmation/:petId" element={<PaymentConfirmation />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App
