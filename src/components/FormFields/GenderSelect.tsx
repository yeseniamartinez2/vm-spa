import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { FunctionComponent } from 'react'
type Props = {
    handleGenderChange: (event: SelectChangeEvent) => void
    gender: string
}

const GenderSelect: FunctionComponent<Props> = ({ handleGenderChange, gender }) => {
    return (
        <FormControl required variant="outlined" size="small" sx={{ m: 1, minWidth: 155 }}>
            <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
            <Select
                required
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={gender}
                onChange={handleGenderChange}
                label="Gender"
                size="small"
            >
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
                <MenuItem value={'other'}>Other</MenuItem>
            </Select>
        </FormControl>
    )
}

export default GenderSelect
