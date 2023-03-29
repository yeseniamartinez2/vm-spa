import { usePetsService } from '../../hooks/pets.hooks'
import PetService from '../../services/pets.service'
import PetListComponent from './PetList.component'
export const PetListContainer = () => {
    const ps = new PetService()
    const { data, loading, error } = usePetsService([], null)

    return <PetListComponent pets={data} loading={loading} error={error} />
}
