describe('filter and search', () => {
    beforeEach(() => {
        cy.visit('/')
      })
    it('filter', () => {
        cy.getDataTest('alpha-filter').select('D')
        cy.get('[data-test="cards"] > :nth-child(1)').should('contain', 'Zimbabwe')
        cy.get('[data-test="cards"] > :nth-child(2)').should('contain', 'Zambia')

        cy.getDataTest('alpha-filter').select('A')
        cy.get('[data-test="cards"] > :nth-child(3)').should('contain', 'Albania')
        cy.get('[data-test="cards"] > :nth-child(6)').should('contain', 'Andorra')

        cy.getDataTest('region-filter').select('Europe')
        cy.getDataTest('cards').children().should('contain', 'Europe')
        cy.getDataTest('cards').children().should('not.contain', 'Asia')

        cy.getDataTest('region-filter').select('Americas')
        cy.getDataTest('cards').children().should('contain', 'Americas')
        cy.getDataTest('cards').children().should('not.contain', 'Oceania')
    })

    it('search', () => {
        cy.getDataTest('search-input').type('a')
        cy.getDataTest('cards').children().should('contain', 'a')
        cy.getDataTest('search-input').clear()

        cy.getDataTest('search-input').type('z')
        cy.getDataTest('cards').children().should('contain', 'z')
        cy.getDataTest('search-input').clear()

        cy.getDataTest('search-input').type(`san`)
        cy.getDataTest('cards').children().each(($el) => {
            cy.wrap($el).invoke('text').should('match', /san/i); 
          });
        cy.getDataTest('search-input').clear()

        cy.getDataTest('search-input').type(`pra`)
        cy.getDataTest('cards').children().should('not.exist')
        cy.getDataTest('search-input').clear()


        cy.getDataTest('search-input').type(`Argentina`)
        cy.getDataTest('cards').children().each(($el) => {
            cy.wrap($el).invoke('text').should('match', /argentina/i); 
          });
          cy.getDataTest('cards').within(() => {
            cy.getDataTest('card-ARG').click()
          })
          cy.location('pathname').should('eq', '/ARG')
        
    })


})