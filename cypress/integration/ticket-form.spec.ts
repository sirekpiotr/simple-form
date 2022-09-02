// Your tests go in here. Happy coding! 🤓

import testData from '../fixtures/test-data.json'

describe('Ticket form submition', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('[data-cy=name]').type(testData.name)
        cy.get('[data-cy=email]').type(testData.email)
        cy.get('[data-cy=subject]').type(testData.subject)
        cy.get('[data-cy=message]').type(testData.message)
    })

    it('Successful submition of the form', () => {
        cy.intercept('POST', '*/tickets/new', {
            statusCode: 200,
            body: {
                id: 'ABCD',
            },
        }).as('mockedSuccessfulSubmitionRequest')
        cy.get('[data-cy=submit]').click()
        cy.wait('@mockedSuccessfulSubmitionRequest')
        cy.get('[data-cy=success]').should('be.visible')
    })

    it('Unsuccessful submition of the form', () => {
        cy.intercept('POST', '*/tickets/new', {
            statusCode: 500,
            body: {
                error: 'Internal server error',
            },
        }).as('mockedUnsuccessfulSubmitionRequest')
        cy.get('[data-cy=submit]').click()
        cy.wait('@mockedUnsuccessfulSubmitionRequest')
        cy.get('[data-cy=fail]').should('be.visible')
    })
})
