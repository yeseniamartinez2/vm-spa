import { useAuth0 } from '@auth0/auth0-react'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'
import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Pet from '../../models/pet.interface'

export type Props = {
    pet: Pet[]
    loading?: boolean
    error?: boolean
}

const booleanToIcon = (bool: any) => {
    if (bool === 'true') return <CheckCircleIcon fontSize="small" color="primary" />
    else return <CancelIcon fontSize="small" color="error" />
}
const genderIcon = (gender: string) => {
    if (gender === 'female') return <FemaleIcon sx={{ color: '#ff8aa7' }} />
    if (gender === 'male') return <MaleIcon color="primary" />
    else return <p>Other</p>
}

export const PetDetailComponent: FunctionComponent<Props> = ({ pet, loading, error }) => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const { isAuthenticated, loginWithRedirect } = useAuth0()
    function getAge(dateString: string) {
        var birthDate = new Date(dateString)
        const today = new Date()
        const monthDifference = today.getMonth() - birthDate.getMonth()
        let age: string | number =
            today.getFullYear() - birthDate.getFullYear() - (monthDifference < 0 ? 1 : 0)
        if (age === 0) age = monthDifference + ' ' + t('adopt.months')
        else age = age + ' ' + t('adopt.years')
        return age
    }
    const navigateToRequest = () => {
        navigate('../adoption-request', { state: pet })
    }
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
                        <li>
                            {t('adopt.vaccinated')}: {vaxxed && booleanToIcon(vaxxed)}{' '}
                        </li>
                        <li>
                            {t('adopt.spayed_neutered')}: {spay_neut && booleanToIcon(spay_neut)}{' '}
                        </li>
                    </ul>
                </section>
                <section className="pet-detail__description">
                    <h3>{t('adopt.description')}</h3>
                    <p>{description}</p>
                </section>
                <section className="pet-detail__request">
                    <button
                        className={
                            isAuthenticated ? 'btn_outlined btn_dark' : 'btn_outlined btn_disabled'
                        }
                        onClick={navigateToRequest}
                        disabled={!isAuthenticated}
                    >
                        {t('adopt.req_adoption')}
                    </button>
                    {!isAuthenticated && (
                        <span>
                            <a onClick={() => loginWithRedirect()}>{t('adopt.log_in')}</a>{' '}
                            {t('adopt.to_make_request')}
                        </span>
                    )}
                </section>
            </div>
        )
    }
    return null
}

export default PetDetailComponent
