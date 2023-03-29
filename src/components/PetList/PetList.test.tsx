import { screen } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, render } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import { PetListComponent, Props } from '../../components/PetList/PetList.component'
afterEach(cleanup)
function renderPetList(props: Partial<Props> = { pets: [] }) {
    const defaultProps: Props = {
        pets: [],
        loading: false,
        error: false,
    }

    return render(<PetListComponent {...defaultProps} {...props} />, {
        wrapper: HashRouter,
    })
}
describe('PetList', () => {
    test('loading in pet list call', async () => {
        const props = {
            loading: true,
        }
        renderPetList(props)
        expect(screen.getByRole('feedback')).toHaveTextContent(/Loading/)
    })
    test('error in pet list call', async () => {
        const props = {
            error: true,
        }
        renderPetList(props)
        expect(screen.getByRole('feedback')).toHaveTextContent(/Error/)
    })
    test('render pets', async () => {
        const props = {
            pets: [
                { _id: '1', name: 'Maya' },
                { _id: '2', name: 'Lobo' },
                { _id: '3', name: 'Mojito' },
            ],
        }
        const { queryAllByTestId } = renderPetList(props)
        const titles = queryAllByTestId('pet').map((x) => x.querySelector('h2')?.innerHTML)
        expect(titles).toEqual(['Maya', 'Lobo', 'Mojito'])
        expect(queryAllByTestId('pet')).toHaveLength(3)
    })
})
