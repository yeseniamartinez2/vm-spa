import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'
export const genderIcon = (gender: string) => {
    if (gender === 'female') return <FemaleIcon sx={{ color: '#ff8aa7' }} />
    if (gender === 'male') return <MaleIcon color="primary" />
    else return <p>Other</p>
}
