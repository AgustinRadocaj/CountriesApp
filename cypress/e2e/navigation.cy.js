describe('navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('paths', () => {
    cy.getDataTest('cards').within(() => {
      cy.getDataTest('card-CHE').click()
    })
    cy.location('pathname').should('eq', '/CHE')

    cy.getDataTest('border-buttons').within(() => {
      cy.getDataTest('countrie-ITA').click()
    })
    cy.location('pathname').should('eq', '/ITA')

    cy.getDataTest('border-buttons').within(() => {
      cy.getDataTest('countrie-SVN').click()
    })
    cy.location('pathname').should('eq', '/SVN')

    cy.getDataTest('back-button').click()
    cy.location('pathname').should('eq', '/ITA')

    cy.getDataTest('random-button').click()
    cy.location('pathname').should('not.eq', '/ITA')

    cy.getDataTest('home-button').click()
    cy.location('pathname').should('eq', '/')
  })
})