import { useAuth0 } from '@auth0/auth0-react'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Modal from '@mui/material/Modal'
import OutlinedInput from '@mui/material/OutlinedInput'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import AdoptionRequestService from '../../services/adoptionRequest.service'
const AdoptionRequestForm: FunctionComponent = () => {
    const ars = new AdoptionRequestService()
    const [openModal, setOpenModal] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [income, setIncome] = useState<string>('')
    const [otherPets, setOtherPets] = useState('false')
    const [kids, setKids] = useState('false')
    const [experienceDescription, setExperienceDescription] = useState('')
    const location = useLocation()
    const { user } = useAuth0()
    const { t } = useTranslation()
    const navigate = useNavigate()
    const navigateToHome = () => {
        navigate('/pets')
    }
    const invalidData = () => {
        if (phoneNumber === '' || income === '' || experienceDescription === '') {
            return true
        } else {
            return false
        }
    }

    const requestBody = () => {
        return {
            pet_id: location.state[0]._id,
            user_email: user?.email,
            user_fullname: user?.name,
            phone_number: phoneNumber,
            income: income,
            has_other_pets: otherPets,
            has_kids: kids,
            experience_description: experienceDescription,
        }
    }
    const handleSubmit = () => {
        const body = requestBody()

        ars.addAdoptionRequest(body) //missing token
            .then((res) => {
                if (res.status === 200) {
                    setOpenModal(true)
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }
    return (
        <div className="adoption-request__container">
            <h2>{t('adoption_reqs.form_title')}</h2>
            <div className="adoption-request__column1">
                <div className="adoption-request__image-wrapper">
                    <img
                        height="200"
                        width="325"
                        src={process.env.VM_API_URL + location.state[0].filename + '_medium.avif'}
                        alt={location.state[0].name}
                    />
                </div>
                <h3>{location.state[0].name}</h3>
            </div>

            <form>
                <TextField
                    id="outlined-basic"
                    size="small"
                    label={t('adoption_reqs.phone')}
                    variant="outlined"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <FormControl>
                    <InputLabel htmlFor="outlined-adornment-amount">
                        {t('adoption_reqs.income')}
                    </InputLabel>
                    <OutlinedInput
                        size="small"
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Amount"
                        onChange={(e) => setIncome(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel id="other-pets-radio-buttons-group-label">
                        {t('adoption_reqs.other_pets')}
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="other-pets-radio-buttons-group-label"
                        name="other-pets-radio-buttons-group"
                        value={otherPets}
                        onChange={(e) => setOtherPets(e.target.value)}
                    >
                        <FormControlLabel
                            value="true"
                            control={<Radio />}
                            label={t('adoption_reqs.yes')}
                        />
                        <FormControlLabel
                            value="false"
                            control={<Radio />}
                            label={t('adoption_reqs.no')}
                        />
                    </RadioGroup>
                </FormControl>

                <FormControl>
                    <FormLabel id="other-pets-radio-buttons-group-label">
                        {t('adoption_reqs.kids')}
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="kids-radio-buttons-group-label"
                        name="kids-radio-buttons-group"
                        value={kids}
                        onChange={(e) => setKids(e.target.value)}
                    >
                        <FormControlLabel
                            value="true"
                            control={<Radio />}
                            label={t('adoption_reqs.yes')}
                        />
                        <FormControlLabel
                            value="false"
                            control={<Radio />}
                            label={t('adoption_reqs.no')}
                        />
                    </RadioGroup>
                </FormControl>

                <TextField
                    id="outlined-basic"
                    multiline
                    rows={4}
                    label={t('adoption_reqs.experience')}
                    variant="outlined"
                    onChange={(e) => {
                        setExperienceDescription(e.target.value)
                    }}
                />

                <Button variant="contained" onClick={handleSubmit} disabled={invalidData()}>
                    {t('adoption_reqs.submit')}
                </Button>
            </form>

            <Modal className="adoption-request__feedback-modal" open={openModal}>
                <div className="adoption-request__feedback-container">
                    <p>{t('adoption_reqs.req_submitted')}</p>
                    <button className={'btn_outlined btn_dark'} onClick={navigateToHome}>
                        {t('adoption_reqs.close')}
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default AdoptionRequestForm
