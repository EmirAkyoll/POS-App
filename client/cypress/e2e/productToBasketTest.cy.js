describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/') 
  });

  it('should display the login form', () => {
    cy.get('li.category-item').contains('Vegetables').click().wait(400)
    cy.get('li.category-item').contains('Vegetables').parent('li').should('have.class', '!bg-pink-900')
    cy.get('img[src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJZ_oekRBzukoIrPYYzRadRMfIgNacbu61Ig&usqp=CAU"]').click().click();  
    cy.contains('Product added to cart').wait(500)  

    cy.get('li.category-item').contains('Drink').click().wait(400)
    cy.get('li.category-item').contains('Drink').parent('li').should('have.class', '!bg-pink-900')
    cy.get('img[src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt5EN56tPfT4NJY2uI2Lj4wwiODSNIZFY2PA&usqp=CAU"]').click()
    cy.contains('Product added to cart').wait(500)  

    cy.get('li.category-item').contains('Fruit').click().wait(400)
    cy.get('li.category-item').contains('Fruit').parent('li').should('have.class', '!bg-pink-900')
    cy.get('img[src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC5PahUQfPoFuCCEUNKSHV-Nadm9ee0AgXoA&usqp=CAU"]').click()
    cy.contains('Product added to cart').wait(400)

    cy.get('button').contains('Create Order').click().wait(500)

    cy.get('td.ant-table-cell button').eq(4).click().wait(400)
    
    cy.get('button span').contains('Create Order').parent('button').click()

    cy.get("input[id='customerName']").type('Firuze')
    cy.get("input[id='customerPhoneNumber']").type('587 468 95 37')
    cy.pause()
    cy.get("button[type='submit']").contains('Create Order').click();
  });
});
