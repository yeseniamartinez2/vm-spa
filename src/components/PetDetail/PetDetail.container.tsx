import { useParams } from 'react-router-dom'
import { usePetsService } from '../../hooks/pets.hook'
import PetDetailComponent from './PetDetail.component'
export const PetDetailContainer = () => {
    const { petId } = useParams()
    const { data, loading, error } = usePetsService(null, petId)

    return <PetDetailComponent pet={data} loading={loading} error={error} />
}
