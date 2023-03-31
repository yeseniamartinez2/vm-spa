import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { FunctionComponent } from 'react'
type Props = {
    handleSpeciesChange: (event: SelectChangeEvent) => void
    species: string
}

const SpeciesSelect: FunctionComponent<Props> = ({ handleSpeciesChange, species }) => {
    return (
        <FormControl required variant="outlined" size="small" sx={{ m: 1, minWidth: 155 }}>
            <InputLabel id="demo-simple-select-outlined-label">Species</InputLabel>
            <Select
                required
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={species}
                onChange={handleSpeciesChange}
                label="Species"
                size="small"
            >
                <MenuItem value={'cat'}>Cat</MenuItem>
                <MenuItem value={'dog'}>Dog</MenuItem>
                <MenuItem value={'other'}>Other</MenuItem>
            </Select>
        </FormControl>
    )
}

export default SpeciesSelect
