describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register') // Make sure this URL matches your login page's URL
  });

  it('should display the login form', () => {
    cy.get('h1').should('contain', 'POS App') // Check if the page title is displayed
    cy.get('form').should('exist') // Check if the login form exists
  });

  it('run all project', () => {
    const username = `user${Math.floor(Math.random() * 10000)}`;
    const email = `${username}@example.com`;
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
    // Fill in the email and password fields
    cy.get('input[test-item="email"]').type(email)
    cy.get('input[test-item="password"]').type(password)

    // Check the "Remember me" checkbox
    cy.get('input[type="checkbox"]').check()

    // Submit the form  
    cy.get('button[type="submit"]').click()

    // Add some product to basket
    cy.contains('Login successful.').should('exist').wait(500)  
    cy.visit('http://localhost:3000/')
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
    
    // Go to the cart page, delete one of the products and create the order
    cy.visit('http://localhost:3000/cart');
    cy.get('td.ant-table-cell button').eq(4).click().wait(400)
    
    cy.get('button span').contains('Create Order').parent('button').click()

    cy.get("input[id='customerName']").type('Firuze')
    cy.get("input[id='customerPhoneNumber']").type('587 468 95 37')
    cy.pause()
    cy.get("button[type='submit']").contains('Create Order').click();

    cy.wait(500)
    // check the scrolling of the table on the invoice page
    cy.url().should('eq', 'http://localhost:3000/invoices')
    cy.get('.ant-table-body').scrollTo('bottom', { duration: 1500 }).scrollTo('top', { duration: 500 })

    cy.wait(500)

    // check the scrolling of the table on the customer page
    cy.get('a').contains('Customers').click()
    cy.url().should('eq', 'http://localhost:3000/customers')
    cy.get('.ant-table-body').scrollTo('bottom', { duration: 1500 }).scrollTo('top', { duration: 500 })

    cy.wait(500)

    // create new category
    cy.get('a').contains('Home').click()
    cy.get('aside.categories').scrollTo('bottom', { duration: 1000 }).wait(250)
    cy.get('aside.categories ul li').eq(-2).click().wait(250)
    cy.get("input[test-attr='new-category-name']").type('Furniture').wait(250)
    cy.get('button').contains('Add').click()
    cy.get("button[aria-label='Close']").click().wait(400)
    cy.get('aside.categories').scrollTo('top', { duration: 500 }).wait(250)

    // create new product
    cy.get('section.products').scrollTo('bottom', { duration: 1000 }).wait(250)
    cy.get("section.products span[aria-label='plus']").click()
    cy.get("input[test-attr='new-product-name']").type('Chair')
    cy.get("input[test-attr='new-product-image']").type('https://m.media-amazon.com/images/I/418QpEn9JKL._AC_UF894,1000_QL80_DpWeblab_.jpg')
    cy.get("input[test-attr='new-product-price']").type('14')
    cy.pause() // Chose category
    cy.wait(400)
    cy.get("button[type='submit']").contains('Create').click();

    // search chair in products
    cy.get("input[placeholder='Search']").type('Chair').wait(1500)
    cy.get('.product-item').should('have.length', 3); //Apple card, add button and edit button
    cy.get("input[placeholder='Search']").clear().wait(250)

    // edit product and delete 'chair'
    cy.get('section.products').scrollTo('bottom', { duration: 700 }).wait(750)
    cy.get("section.products span[aria-label='edit']").click().wait(300)

    cy.get("ul.ant-pagination li[title='2'] a").click().wait(300)
    cy.url().should('eq', 'http://localhost:3000/products')
    cy.get('.ant-table-body').scrollTo('bottom', { duration: 1000 })  
    cy.pause() // Delete 'Chair'
    cy.visit('http://localhost:3000').wait(1500)

    // search chair in product again
    cy.get("input[placeholder='Search']").type('Chair').wait(1500)
    cy.get('.product-item').should('have.length', 2); //Only add button and edit button
    cy.get("input[placeholder='Search']").clear().wait(250)

    cy.get('aside.categories').scrollTo('bottom', { duration: 1000 }).wait(350)
    cy.get('aside.categories ul li').eq(-1).click().wait(250)
    cy.get('form[test-attr="edit-categories-form"]').scrollTo('bottom', { duration: 1000 }).wait(350)
    cy.pause() // Delete 'Furniture' and close modal
    
    // add some product into cart
    cy.get('li.category-item').contains('Clothes').click().wait(400)
    cy.get('li.category-item').contains('Clothes').parent('li').should('have.class', '!bg-pink-900')
    cy.get('img[src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQurzuEpzPzpjV_UmfEJI5_pGENSz-UIFkQpg&usqp=CAU"]').click().wait(250)  
    cy.contains('Product added to cart').wait(500)  

    cy.get('li.category-item').contains('Vegetables').click().wait(400)
    cy.get('li.category-item').contains('Vegetables').parent('li').should('have.class', '!bg-pink-900')
    cy.get('img[src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJZ_oekRBzukoIrPYYzRadRMfIgNacbu61Ig&usqp=CAU"]').click().wait(250)
    cy.contains('Product added to cart').wait(500)  

    cy.get('li.category-item').contains('All').click().wait(400)
    
    // remove product which added fromcart
    cy.get('button').contains('Discard All').click()

    // log out and back to login page
    cy.get('a').contains('Log Out').click()
    cy.url().should('eq', 'http://localhost:3000/login')
  });
})
