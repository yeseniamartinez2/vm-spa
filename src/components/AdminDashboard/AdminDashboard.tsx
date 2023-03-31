import { Route, Routes } from 'react-router-dom'
import { PetTableContainer } from '../PetTable/PetTable.container'
const AdminDashboard = () => {
    return (
        <section className="admin-dashboard">
            <Routes>
                <Route path="pets" element={<PetTableContainer />} />
            </Routes>
        </section>
    )
}

export default AdminDashboard
