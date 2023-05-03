import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import { FunctionComponent, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
const AdoptionRequestForm: FunctionComponent = () => {
    const location = useLocation()

    useEffect(() => {
        console.log(location.state)
    }, [])
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
                <TextField id="outlined-basic" label="Phone number" variant="outlined" />
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Amount"
                    />
                </FormControl>
                <TextField
                    id="outlined-basic"
                    multiline
                    rows={4}
                    label="Outlined"
                    variant="outlined"
                />
            </form>
        </div>
    )
}

export default AdoptionRequestForm
