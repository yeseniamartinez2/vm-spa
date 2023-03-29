import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import IPet from '../../models/pet.interface'

type Props = {
    pet: IPet
}
const PetCard: FunctionComponent<Props> = ({ pet }) => {
    const dobDate: Date | undefined = new Date(pet.dob || '')
    return (
        <Card id="pet-card" key={pet.name} data-testid="pet">
            <img
                height="200"
                width="325"
                src={
                    process.env.VM_API_URL +
                    pet.name +
                    '_' +
                    dobDate!.getMonth() +
                    dobDate!.getFullYear() +
                    '_medium.avif'
                }
                alt={pet.name}
            />
            <h2>{pet.name}</h2>
            <CardContent></CardContent>
            <CardActions>
                <Button component={Link} to={'/pets/' + pet._id} size="small">
                    Ver más
                </Button>
            </CardActions>
        </Card>
    )
}

export default PetCard
