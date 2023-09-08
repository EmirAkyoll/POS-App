describe('Product Operations', () => {
  it('should log in with valid credentials', () => {
    cy.visit('http://localhost:3000/')
    cy.get('section.products').scrollTo('bottom', { duration: 1000 }).wait(250)
    cy.get("section.products span[aria-label='plus']").click()

    cy.get("input[test-attr='new-product-name']").type('Chair')
    cy.get("input[test-attr='new-product-image']").type('https://m.media-amazon.com/images/I/418QpEn9JKL._AC_UF894,1000_QL80_DpWeblab_.jpg')
    cy.get("input[test-attr='new-product-price']").type('14')
    cy.pause() // Chose category
    cy.wait(400)
    cy.get("button[type='submit']").contains('Create').click();

    cy.get("input[placeholder='Search']").type('Chair').wait(1500)
    cy.get('.product-item').should('have.length', 3); //Apple card, add button and edit button
    cy.get("input[placeholder='Search']").clear().wait(250)

    cy.get('section.products').scrollTo('bottom', { duration: 700 }).wait(750)
    cy.get("section.products span[aria-label='edit']").click().wait(300)

    cy.get("ul.ant-pagination li[title='2'] a").click().wait(300)
    cy.url().should('eq', 'http://localhost:3000/products')
    cy.get('.ant-table-body').scrollTo('bottom', { duration: 1000 })  
    cy.pause() // Delete 'Chair'
    cy.visit('http://localhost:3000').wait(1500)
    cy.get("input[placeholder='Search']").type('Chair').wait(1500)
    cy.get('.product-item').should('have.length', 2); //Only add button and edit button
    cy.get("input[placeholder='Search']").clear().wait(250)
  });
});
