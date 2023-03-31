import { usePetsService } from '../../hooks/pets.hooks'
import { PetTable } from './PetTable.component'
export const PetTableContainer = () => {
    const { data, loading, error } = usePetsService([], null)

    return <PetTable pets={data} loading={loading} error={error} />
}
