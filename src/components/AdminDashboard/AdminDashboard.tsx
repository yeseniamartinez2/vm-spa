import { Route, Routes } from 'react-router-dom'
import { PetTableContainer } from '../AdminPetTable/PetTable.container'
import Sidebar from '../AdminSidebar/Sidebar'
const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <Sidebar />
            <main className="dashboard-main">
                <Routes>
                    <Route path="pets" element={<PetTableContainer />} />
                </Routes>
            </main>
        </div>
    )
}

export default AdminDashboard
