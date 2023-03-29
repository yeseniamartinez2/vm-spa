import { FunctionComponent } from 'react'
import Pet from '../../models/pet.interface'
import PetCard from '../PetCard/PetCard'

export type Props = {
    pets: Pet[]
    loading?: boolean
    error?: boolean
}

export const PetListComponent: FunctionComponent<Props> = ({ pets, loading, error }) => {
    if (loading) {
        return <p role="feedback">Loading...</p>
    }
    if (error) {
        return <p role="feedback">Error...</p>
    }
    return (
        <>
            <h2 className="pets-list__heading">Adopt</h2>
            <div id="pet-list" className="pets-list">
                {pets.map((pet: Pet) => (
                    <PetCard key={pet._id} pet={pet} />
                ))}
            </div>
        </>
    )
}

export default PetListComponent
