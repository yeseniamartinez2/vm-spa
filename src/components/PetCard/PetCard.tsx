import Card from '@mui/material/Card'
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import IPet from '../../models/pet.interface'
import { genderIcon } from '../../utils/functions'
type Props = {
    pet: IPet
}
const PetCard: FunctionComponent<Props> = ({ pet }) => {
    const filename = pet.filename || ''
    return (
        <Card id="pet-card" key={pet.name} data-testid="pet">
            <img
                height="200"
                width="325"
                src={process.env.VM_API_URL + filename + '_medium.avif'}
                alt={pet.name}
            />
            <section className="pet-card__content">
                <h2>
                    {pet.name} {pet.gender && genderIcon(pet.gender)}
                </h2>
                <Link to={'/pets/' + pet._id}>Ver más</Link>
            </section>
        </Card>
    )
}

export default PetCard
