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
    const navigate = useNavigate()
    const navigateToHome = () => {
        navigate('/pets')
    }
    const invalidData = () => {
        console.log(
            "🌿 ~ file: AdoptionRequestForm.component.tsx:27 ~ invalidData ~ phoneNumber === '' || income === '' || experienceDescription === '':",
            phoneNumber === '' || income === '' || experienceDescription === ''
        )
        if (phoneNumber === '' || income === '' || experienceDescription === '') {
            return true
        } else {
            return false
        }
    }

    const requestBody = () => {
        console.log('🌿 ~ file: AdoptionRequestForm.component.tsx:53 ~ requestBody ~ user:', user)

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
            <h2>Adoption Request</h2>
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
                    label="Phone number"
                    variant="outlined"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <FormControl>
                    <InputLabel htmlFor="outlined-adornment-amount">Income</InputLabel>
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
                        Do you have other pets at home?
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="other-pets-radio-buttons-group-label"
                        name="other-pets-radio-buttons-group"
                        value={otherPets}
                        onChange={(e) => setOtherPets(e.target.value)}
                    >
                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>

                <FormControl>
                    <FormLabel id="other-pets-radio-buttons-group-label">
                        Do you have kids?
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="kids-radio-buttons-group-label"
                        name="kids-radio-buttons-group"
                        value={kids}
                        onChange={(e) => setKids(e.target.value)}
                    >
                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>

                <TextField
                    id="outlined-basic"
                    multiline
                    rows={4}
                    label="Describe you experience with pets:"
                    variant="outlined"
                    onChange={(e) => {
                        setExperienceDescription(e.target.value)
                    }}
                />

                <Button variant="contained" onClick={handleSubmit} disabled={invalidData()}>
                    Submit
                </Button>
            </form>

            <Modal className="adoption-request__feedback-modal" open={openModal}>
                <div className="adoption-request__feedback-container">
                    <p>Request submitted.</p>
                    <button className={'btn_outlined btn_dark'} onClick={navigateToHome}>
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default AdoptionRequestForm
