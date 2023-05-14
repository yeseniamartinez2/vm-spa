import { useAuth0 } from '@auth0/auth0-react'
import Drawer from '@mui/material/Drawer'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IAdoptionRequest } from '../../models/adoptionRequest.interface'
import { AuthButton } from './AuthButton'
import RequestTile from './RequestTile'

export interface IMenuProps {
    roles: string
    requests: IAdoptionRequest[]
}
export const Menu = ({ roles, requests }: IMenuProps) => {
    const { isAuthenticated, user } = useAuth0()
    const [openDrawer, setOpenDrawer] = useState(false)

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer)
    }

    return (
        <nav className="menu_bar">
            <div>
                <Link to="/">
                    <img id="logo" className="logo" src={process.env.PUBLIC_URL + '/logo.svg'} />
                </Link>
                <ul>
                    <li className="menu__item" role="menuitem">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="menu__item" role="menuitem">
                        <Link to="pets">Adopt</Link>
                    </li>
                    {requests.length > 0 && (
                        <li className="menu__item" role="menuitem" onClick={() => toggleDrawer()}>
                            My Requests
                        </li>
                    )}
                </ul>
            </div>
            <div>
                <Drawer
                    className="adoption-requests__list"
                    anchor={'right'}
                    open={openDrawer}
                    onClose={() => toggleDrawer()}
                >
                    <h2>Adoption Requests</h2>
                    {requests.map((req) => (
                        <RequestTile adoptionRequest={req} />
                    ))}
                </Drawer>
                <span className="username">
                    {isAuthenticated && user?.email}
                    {roles.includes('admin') && (
                        <span className="menu__admin-site" role="menu__admin-site">
                            Go to <Link to="admin/pets">Admin Site</Link>
                        </span>
                    )}
                </span>

                <AuthButton />
            </div>
        </nav>
    )
}
