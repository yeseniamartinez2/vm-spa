import TextField from '@mui/material/TextField'
import { FunctionComponent } from 'react'
type Props = {
    handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    name: string
}

const NameTextfield: FunctionComponent<Props> = ({ handleNameChange, name }) => {
    return (
        <TextField
            required
            id="filled-required"
            label="Name"
            variant="outlined"
            size="small"
            value={name}
            onChange={handleNameChange}
        />
    )
}

export default NameTextfield
