import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import Theme from 'src/models/theme.interface'
import Props from '../models/props.interface'
const ThemeContext = ({ children }: Props) => {
    const lightTheme: Theme = { palette: {
        primary: {
            main: '#005c64',
        },
        secondary: {
            main: '#efd309',
        },
    }}
    const theme = createTheme(lightTheme)

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default ThemeContext
