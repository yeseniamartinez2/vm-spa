import { useAuth0 } from '@auth0/auth0-react'
import { useTranslation } from 'react-i18next'

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0()
    const { t } = useTranslation()

    return (
        <button className="btn_outlined btn_light" onClick={() => loginWithRedirect()}>
            {t('navigation.login_btn')}
        </button>
    )
}

export default LoginButton
