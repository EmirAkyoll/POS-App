describe('Login Page', () => {

  it('should log in with valid credentials', () => {
    cy.url().should('eq', 'http://localhost:3000/invoices')
    cy.get('.ant-table-body').scrollTo('bottom', { duration: 1500 }).scrollTo('top', { duration: 500 })

    cy.wait(500)

    cy.get('a').contains('Customers').click()
    cy.url().should('eq', 'http://localhost:3000/customers')
    cy.get('.ant-table-body').scrollTo('bottom', { duration: 1500 }).scrollTo('top', { duration: 500 })
  });
});
