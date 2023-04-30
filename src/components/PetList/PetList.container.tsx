import { usePetsService } from '../../hooks/pets.hooks'
import PetListComponent from './PetList.component'
export const PetListContainer = () => {
    const { data, loading, error } = usePetsService([], null)

    return <PetListComponent pets={data} loading={loading} error={error} />
}
