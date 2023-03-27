import { useAuth0 } from '@auth0/auth0-react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Menu } from './Menu.component'
const user = {
    email: 'johndoe@me.com',
    email_verified: true,
    sub: 'google-oauth2|12345678901234',
}

const adminUser = {
    email: 'johndoe@me.com',
    email_verified: true,
    sub: 'google-oauth2|12345678901234',
    'https://<<API_URL>>/roles': ['admin', 'superuser'],
}

jest.mock('@auth0/auth0-react')

const mockedUseAuth0 = jest.mocked(useAuth0)

describe('Menu', () => {
    beforeEach(() => {
        mockedUseAuth0.mockReturnValue({
            isAuthenticated: true,
            user,
            logout: jest.fn(),
            loginWithRedirect: jest.fn(),
            getAccessTokenWithPopup: jest.fn(),
            getAccessTokenSilently: jest.fn(),
            getIdTokenClaims: jest.fn(),
            loginWithPopup: jest.fn(),
            isLoading: false,
            buildAuthorizeUrl: jest.fn(),
            buildLogoutUrl: jest.fn(),
            handleRedirectCallback: jest.fn(),
        })
    })
    test('renders user menu', () => {
        const { queryAllByRole } = render(<Menu />, {
            wrapper: BrowserRouter,
        })
        const options = queryAllByRole('menuitem').map((x) => x.querySelector('a')?.innerHTML)
        expect(options).toEqual(['Home', 'Adopt'])
    })
})
