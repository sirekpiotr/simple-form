// Your tests go in here. Happy coding! 🤓

import { name, email, subject, message } from '../fixtures/test-data.json'

describe('Ticket form submission', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('[data-cy=name]').type(name)
        cy.get('[data-cy=email]').type(email)
        cy.get('[data-cy=subject]').type(subject)
        cy.get('[data-cy=message]').type(message)
    })

    it('Successful submission of the form', () => {
        cy.intercept('POST', '*/tickets/new', {
            statusCode: 200,
            body: { id: 'ABCD' },
        }).as('mockedSuccessfulSubmissionRequest')
        cy.get('[data-cy=submit]').click()
        cy.wait('@mockedSuccessfulSubmissionRequest')
        cy.get('[data-cy=success]').should('be.visible')
    })

    it('Unsuccessful submition of the form', () => {
        cy.intercept('POST', '*/tickets/new', {
            statusCode: 500,
            body: { error: 'Internal server error' },
        }).as('mockedUnsuccessfulSubmissionRequest')
        cy.get('[data-cy=submit]').click()
        cy.wait('@mockedUnsuccessfulSubmissionRequest')
        cy.get('[data-cy=fail]').should('be.visible')
    })
})
