import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { AuthButton } from './AuthButton'
import { IMenuProps } from './Menu.container'
export const Menu = ({ roles }: IMenuProps) => {
    const { isAuthenticated, user } = useAuth0()
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
                </ul>
            </div>
            <div>
                <span className="username">
                    {isAuthenticated && user?.email}
                    {roles.includes('admin') && (
                        <span className="menu__admin-site" role="menu__admin-site">
                            Go to <Link to="admin/">Admin Site</Link>
                        </span>
                    )}
                </span>

                <AuthButton />
            </div>
        </nav>
    )
}
