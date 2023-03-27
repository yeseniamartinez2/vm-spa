import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0()

    return (
        <button className="btn_outlined" onClick={() => loginWithRedirect()}>
            Log In
        </button>
    )
}

export default LoginButton
