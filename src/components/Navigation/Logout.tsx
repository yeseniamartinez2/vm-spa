import { useAuth0 } from '@auth0/auth0-react'
import { useTranslation } from 'react-i18next'

const LogoutButton = () => {
    const { logout } = useAuth0()
    const { t } = useTranslation()

    return (
        <button
            className="btn_outlined btn_light"
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        >
            {t('navigation.logout_btn')}
        </button>
    )
}

export default LogoutButton
