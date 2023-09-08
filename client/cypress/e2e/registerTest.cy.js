describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register'); // Add the URL of the registration page here
  });

  it('should register a new user', () => {
    // Generate random user information
    const username = `user${Math.floor(Math.random() * 10000)}`;
    const email = `user${Math.floor(Math.random() * 10000)}@example.com`;
    const password = `user${Math.floor(Math.random() * 10000)}`;

    // Enter information in the form fields
    cy.get('input[test-item="username"]').type(username);
    cy.get('input[test-item="email"]').type(email);
    cy.get('input[test-item="password"]').type(password);
    cy.get('input[test-item="passwordAgain"]').type(password);

    // Click the register button
    cy.get('button[type="submit"]').click();

    // Check the successful registration message
    cy.contains('Registration successful.').should('exist');
  });

  it('should show an error for mismatched passwords', () => {
    // Enter information in form fields, but make passwords different
    const username = `user${Math.floor(Math.random() * 10000)}`;
    const email = `user${Math.floor(Math.random() * 10000)}@example.com`;
    const password = `user${Math.floor(Math.random() * 10000)}`;
    const mismatchedPassword = 'password123';

    cy.get('input[test-item="username"]').type(username);
    cy.get('input[test-item="email"]').type(email);
    cy.get('input[test-item="password"]').type(password);
    cy.get('input[test-item="passwordAgain"]').type(mismatchedPassword);

    // Click the register button
    cy.get('button[type="submit"]').click();

    // Check the error message
    cy.contains('The two passwords that you entered do not match!').should('exist');
  });
});
