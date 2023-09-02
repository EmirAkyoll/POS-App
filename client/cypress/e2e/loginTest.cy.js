describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login'); // Make sure this URL matches your login page's URL
  });

  it('should display the login form', () => {
    cy.get('h1').should('contain', 'POS App'); // Check if the page title is displayed
    cy.get('form').should('exist'); // Check if the login form exists
  });

  it('should log in with valid credentials', () => {
    // Fill in the email and password fields
    cy.get('input[test-item="email"]').type('favraf@hotmail.com');
    cy.get('input[test-item="password"]').type('favraf123');

    // Check the "Remember me" checkbox
    cy.get('input[type="checkbox"]').check();

    // Submit the form  
    cy.get('button[type="submit"]').click();

    // Check for a successful login message
    cy.contains('Login successful.').should('exist');
  });

  it('should show an error message with invalid credentials', () => {
    // Fill in the email and password fields with invalid data
    cy.get('input[test-item="email"]').type('favraf@hotmail.com');
    cy.get('input[test-item="password"]').type('favraf133');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Check for error messages
    cy.contains('Wrong password!').should('exist');
  });
});
