import { createTheme, ThemeProvider } from '@mui/material/styles'
import Props from '../models/props.interface'
import Theme from '../models/theme.interface'
const ThemeContext = ({ children }: Props) => {
    const lightTheme: Theme = {
        palette: {
            primary: {
                main: '#005c64',
            },
            secondary: {
                main: '#efd309',
            },
            success: {
                main: '#005c64',
            },
            error: {
                main: '#bf211e',
            },
            pink: {
                main: '#f0eae5',
            },
        },
    }
    const theme = createTheme(lightTheme)

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default ThemeContext
