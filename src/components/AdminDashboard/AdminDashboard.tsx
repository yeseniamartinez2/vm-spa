import { Route, Routes } from 'react-router-dom'
import { AdoptionRequestTableContainer } from '../AdminAdoptionRequestTable/AdoptionRequestTable.container'
import { PetTableContainer } from '../AdminPetTable/PetTable.container'
import Sidebar from '../AdminSidebar/Sidebar'
const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <Sidebar />
            <main className="dashboard-main">
                <Routes>
                    <Route path="pets" element={<PetTableContainer />} />
                    <Route path="adoption-requests" element={<AdoptionRequestTableContainer />} />
                </Routes>
            </main>
        </div>
    )
}

export default AdminDashboard
