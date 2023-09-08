describe('Category Operations', () => {

  it('should log in with valid credentials', () => {
    cy.visit('http://localhost:3000/')
    cy.get('a').contains('Home').click()
    cy.get('aside.categories').scrollTo('bottom', { duration: 1000 }).wait(250)
    cy.get('aside.categories ul li').eq(-2).click().wait(250)
    cy.get("input[test-attr='new-category-name']").type('Furniture').wait(250)
    cy.get('button').contains('Add').click()
    cy.get("button[aria-label='Close']").click().wait(400)
    cy.get('aside.categories').scrollTo('top', { duration: 500 }).wait(250)

    cy.get('aside.categories').scrollTo('bottom', { duration: 1000 }).wait(350)
    cy.get('aside.categories ul li').eq(-1).click().wait(250)
    cy.get('form[test-attr="edit-categories-form"]').scrollTo('bottom', { duration: 1000 }).wait(350)
    cy.pause() // Delete 'Furniture' and close modal

    cy.get('aside.categories').scrollTo('bottom', { duration: 1000 }).wait(350)
    cy.get('aside.categories ul li').eq(-1).click().wait(250)
    cy.get('form[test-attr="edit-categories-form"]').scrollTo('bottom', { duration: 1000 }).wait(350)
    cy.pause() // Delete 'Furniture' and close modal
  });
});
