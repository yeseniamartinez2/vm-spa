import DashboardIcon from '@mui/icons-material/Dashboard'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import PetsIcon from '@mui/icons-material/Pets'
import { Link } from 'react-router-dom'
const Sidebar = () => {
    return (
        <aside>
            <ul className="admin-menu drawer-open">
                <li className="admin-menu__item">
                    <Link to="pets">
                        {' '}
                        <DashboardIcon />
                        <span className="admin-menu__item__label">Overview</span>
                    </Link>
                </li>
                <li className="admin-menu__item">
                    <Link to="pets">
                        <PetsIcon />
                        <span className="admin-menu__item__label">Pets</span>
                    </Link>
                </li>
                <li className="admin-menu__item">
                    <Link to="adoption-requests">
                        <InsertDriveFileIcon />
                        <span className="admin-menu__item__label">Adoption Requests</span>
                    </Link>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar
