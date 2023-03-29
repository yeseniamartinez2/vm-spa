import { Auth0Provider } from '@auth0/auth0-react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import App from './App'
import './assets/styles/main.scss'
import ThemeContext from './contexts/theme.context'
let root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const domain = process.env.REACT_APP_AUTH0_DOMAIN || ''
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || ''
root.render(
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
            redirect_uri: window.location.origin,
        }}
    >
        <ThemeContext>
            <Router>
                <App />
            </Router>
        </ThemeContext>
    </Auth0Provider>
)

// reportWebVitals();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log)
