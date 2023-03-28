import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { AuthButton } from './AuthButton'
export const Menu = () => {
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
                    {isAuthenticated && (
                        <li className="menu__item" role="menuitem">
                            <Link to="admin/">Admin Site</Link>
                        </li>
                    )}
                </ul>
            </div>
            <div>
                <span className="username">{isAuthenticated && user?.email}</span>

                <AuthButton />
            </div>
        </nav>
    )
}
