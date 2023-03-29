import { useAuth0 } from '@auth0/auth0-react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import { Menu } from './Menu.component'

const mockedUseAuth0 = jest.mocked(useAuth0)

describe('Menu', () => {
    test('renders user menu', () => {
        const { queryAllByRole } = render(<Menu roles={''} />, {
            wrapper: HashRouter,
        })
        const options = queryAllByRole('menuitem').map((x) => x.querySelector('a')?.innerHTML)
        expect(options).toEqual(['Home', 'Adopt'])
    })
})
