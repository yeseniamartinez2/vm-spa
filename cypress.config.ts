import { defineConfig } from 'cypress'

require('dotenv').config()

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
    env: {
        auth0_admin_username: process.env.AUTH0_ADMIN_USERNAME,
        auth0_admin_password: process.env.AUTH0_ADMIN_PASSWORD,
        auth0_username: process.env.AUTH0_USERNAME,
        auth0_password: process.env.AUTH0_PASSWORD,
        auth0_domain: process.env.REACT_APP_AUTH0_DOMAIN,
        auth0_audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        auth0_scope: process.env.REACT_APP_AUTH0_SCOPE,
        auth0_client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        auth0_client_secret: process.env.AUTH0_CLIENT_SECRET,
    },
})
