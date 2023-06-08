import { useAuth0 } from '@auth0/auth0-react'
import Drawer from '@mui/material/Drawer'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { IAdoptionRequest } from '../../models/adoptionRequest.interface'
import { AuthButton } from './AuthButton'
import { LanguageSelect } from './LanguageSelect'
import RequestTile from './RequestTile'

export interface IMenuProps {
    roles: string
    requests: IAdoptionRequest[]
}
export const Menu = ({ roles, requests }: IMenuProps) => {
    const { isAuthenticated, user } = useAuth0()
    const [openDrawer, setOpenDrawer] = useState(false)
    const { t, i18n } = useTranslation()

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
    }
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
                    <li className="menu__item" role="menuitem" key="1">
                        <Link to="/">{t('navigation.home')}</Link>
                    </li>
                    <li className="menu__item" role="menuitem" key="2">
                        <Link to="pets">{t('navigation.adopt')}</Link>
                    </li>
                    {requests.length > 0 && (
                        <li
                            className="menu__item"
                            role="menuitem"
                            onClick={() => toggleDrawer()}
                            key="3"
                        >
                            {t('navigation.my_requests')}
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
                    <h2>{t('adoption_reqs.title')}</h2>
                    {requests.map((req) => (
                        <RequestTile adoptionRequest={req} toggleDrawer={toggleDrawer} />
                    ))}
                </Drawer>
                <LanguageSelect changeLanguage={changeLanguage} />
                <span className="username">
                    {isAuthenticated && user?.email}
                    {roles.includes('admin') && (
                        <span className="menu__admin-site" role="menu__admin-site">
                            {t('navigation.go_to')}{' '}
                            <Link to="admin/pets">{t('navigation.admin_site')}</Link>
                        </span>
                    )}
                </span>

                <AuthButton />
            </div>
        </nav>
    )
}
