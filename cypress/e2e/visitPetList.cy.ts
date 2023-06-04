describe('Visit Pet List', () => {
    it('Visit pet list', () => {
        cy.visit('http://localhost:1234/')
        cy.contains('Adopt').click()

        cy.url().should('equal', 'http://localhost:1234/#/pets')
        cy.get('h2').contains('Adopt')
    })
})
