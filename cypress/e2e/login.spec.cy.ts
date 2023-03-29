describe('Admin Login', () => {
    it('log in as admin', () => {
        // App landing page redirects to Auth0.
        cy.visit('http://localhost:1234/')
        cy.contains('Log In').click()
        // Login on Auth0.
        cy.origin(
            Cypress.env('auth0_domain'),

            () => {
                cy.get('input#username').type(Cypress.env('auth0_admin_username'))
                cy.get('input#password').type(Cypress.env('auth0_admin_password'), { log: false })
                cy.contains('button[value=default]', 'Continue').click()
            }
        )

        // Ensure Auth0 has redirected us back to the RWA.
        cy.url().should('equal', 'http://localhost:1234/')
        cy.contains('Go to Admin Site')
    })

    it('log in as regular user', () => {
        // App landing page redirects to Auth0.
        cy.visit('http://localhost:1234/')
        cy.contains('Log In').click()
        // Login on Auth0.
        cy.origin(
            Cypress.env('auth0_domain'),

            () => {
                cy.get('input#username').type(Cypress.env('auth0_username'))
                cy.get('input#password').type(Cypress.env('auth0_password'), { log: false })
                cy.contains('button[value=default]', 'Continue').click()
            }
        )

        // Ensure Auth0 has redirected us back to the RWA.
        cy.url().should('equal', 'http://localhost:1234/')
        cy.contains('Go to Admin Site').should('not.exist')
    })
})
