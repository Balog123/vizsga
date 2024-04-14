describe('Termékek oldal ellenőrzése', () => {
  it('Átirányítás és termékek betöltése', () => {
    cy.visit('http://localhost:8000/');
    cy.get('.nav-item.with-dropdown .nav-link-termekek:contains("Termékek")').click();
    cy.url().should('eq', 'http://localhost:8000/products');
    cy.get('.product-center .product-item').should('have.length.greaterThan', 0);
  });

  it('Termékekhez ikonok megjelenése egérrel való mozgatásra', () => {
    cy.visit('http://localhost:8000/products');
    cy.get('.product-center .product-item').eq(0).trigger('mouseover');
    cy.get('.product-center .product-item').eq(0).find('.icons').should('be.visible');
  });

  it('Termék megtekintése', () => {
    cy.visit('http://localhost:8000');
    cy.get('.product-item').first().trigger('mouseover');
    cy.get('.product-item').first().find('.icons i.bx-search').click({ force: true });
    cy.url().should('include', 'http://localhost:8000/products/');
  });

  it('Termék kosárba helyezése', () => {
    cy.visit('http://localhost:8000/bejelentkezes');
    cy.get('#loginEmail').type('user@user.com');
    cy.get('#loginPsw').type('user');
    cy.get('#loginbtn').click();
    cy.url().should('include', 'http://localhost:8000/');

    cy.visit('http://localhost:8000');
    cy.get('.product-item').first().trigger('mouseover');
    cy.get('.product-item').first().find('.icons i.bx-cart').click({ force: true });
    cy.visit('http://localhost:8000/kosar');
    cy.get('#cart-items-container tr').should('have.length.gt', 0);
  });

  it('Rendezés módosítása - Név szerint', () => {
    cy.visit('http://localhost:8000/products');
    cy.get('#sortSelect').select('Név szerint');
    cy.wait(2000);
    cy.get('.product-center .product-item').then(($products) => {
      const firstProductName = $products.eq(0).find('.product-info span').text().trim();
      const secondProductName = $products.eq(1).find('.product-info span').text().trim();
      cy.log('Első termék:', firstProductName);
      cy.log('Második termék:', secondProductName);

      expect(firstProductName.localeCompare(secondProductName)).to.be.lessThan(0);
    });
  });

  it('Rendezés módosítása - Ár szerint csökkenő', () => {
    cy.visit('http://localhost:8000/products');
    cy.get('#sortSelect').select('Ár szerint csökkenő');
    cy.wait(2000);
    cy.get('.product-center .product-item').then(($products) => {
      const firstProductName = $products.eq(0).find('.product-info span').text().trim();
      const firstProductPrice = $products.eq(0).find('.product-info h4').text().trim();
      cy.log('Első termék:', firstProductName, firstProductPrice);

      const secondProductName = $products.eq(1).find('.product-info span').text().trim();
      const secondProductPrice = $products.eq(1).find('.product-info h4').text().trim();
      cy.log('Második termék:', secondProductName, secondProductPrice);

      expect(parseInt(firstProductPrice)).to.be.greaterThan(parseInt(secondProductPrice));
    });
  });

  it('Rendezés módosítása - Ár szerint növekvő', () => {
    cy.visit('http://localhost:8000/products');
    cy.get('#sortSelect').select('Ár szerint növekvő');
    cy.wait(2000);
    cy.get('.product-center .product-item').then(($products) => {
      const firstProductName = $products.eq(0).find('.product-info span').text().trim();
      const firstProductPrice = $products.eq(0).find('.product-info h4').text().trim();
      cy.log('Első termék:', firstProductName, firstProductPrice);

      const secondProductName = $products.eq(1).find('.product-info span').text().trim();
      const secondProductPrice = $products.eq(1).find('.product-info h4').text().trim();
      cy.log('Második termék:', secondProductName, secondProductPrice);

      expect(parseInt(firstProductPrice)).to.be.lessThan(parseInt(secondProductPrice));
    });
  });
});
