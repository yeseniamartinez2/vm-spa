import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'
import { FunctionComponent } from 'react'
import Pet from '../../models/pet.interface'
export type Props = {
    pet: Pet[]
    loading?: boolean
    error?: boolean
}

const genderIcon = (gender: string) => {
    if (gender === 'female') return <FemaleIcon sx={{ color: '#ff8aa7' }} />
    if (gender === 'male') return <MaleIcon color="primary" />
    else return <p>Other</p>
}

function getAge(dateString: string) {
    var birthDate = new Date(dateString)
    const today = new Date()
    const monthDifference = today.getMonth() - birthDate.getMonth()
    let age =
        today.getFullYear() - birthDate.getFullYear() - (monthDifference < 0 ? 1 : 0) + ' years'
    if (age === '0 years') age = monthDifference + ' months'
    return age
}

export const PetDetailComponent: FunctionComponent<Props> = ({ pet, loading, error }) => {
    if (loading) {
        return <p role="feedback">Loading...</p>
    }
    if (error) {
        return <p role="feedback">Error...</p>
    }

    if (Array.isArray(pet)) {
        const { name, dob, species, gender, spay_neut, vaxxed, description } = pet[0]
        const filename = pet[0].filename || ''
        return (
            <div className="pet-detail__container">
                <div className="pet-detail__featured-img__container">
                    <img
                        src={process.env.VM_API_URL + filename + '_large.avif'}
                        alt={name}
                        className="pet-detail__featured-img"
                    />
                </div>
                <h2 className="pet-detail__heading">
                    {name} <span>{dob !== undefined ? getAge(dob.toString()) : null} </span>
                    {gender && genderIcon(gender)}
                </h2>
                <section className="pet-detail__health-info">
                    <ul>
                        <li>Vaccinated: {vaxxed} </li>
                        <li>Spayed/neutered: {spay_neut} </li>
                    </ul>
                </section>
                <section className="pet-detail__description">
                    <h3>Description</h3>
                    <p>{description}</p>
                </section>
                <section className="pet-detail__request">
                    <button className="btn_outlined btn_dark">Request Adoption</button>
                    <span>
                        <a>Log In</a> to make request
                    </span>
                </section>
            </div>
        )
    }
    return null
}

export default PetDetailComponent