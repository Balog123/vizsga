describe('Single Product oldal ellenőrzése', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/bejelentkezes');
    cy.get('#loginEmail').type('user@user.com');
    cy.get('#loginPsw').type('user');
    cy.get('#loginbtn').click();
    cy.url().should('eq', 'http://localhost:8000/');
  });

  it('Termék részleteinek betöltése', () => {
    cy.visit('http://localhost:8000/products/1');
    cy.get('.details').should('exist');
    cy.get('.details h1').should('not.be.empty');
    cy.get('.details .price').should('not.be.empty');
    cy.get('.details form').should('exist');
  });

  it('Nincs elegendő termék raktáron hibaüzenet megjelenik', () => {
    cy.visit('http://localhost:8000/products/1');
    cy.get('#termek_nincs_raktaron').should('not.be.visible');
    cy.get('#addToCartBtn').click();
    cy.get('#termek_nincs_raktaron').should('be.visible');
  });

  it('Termék kosárba sikeres visszajelzés', () => {
    cy.visit('http://localhost:8000/products/5');
    cy.get('#cartMessage').should('not.be.visible');
    cy.get('#addToCartBtn').click();
    cy.get('#cartMessage').should('be.visible');
  });

  it('Kosár tartalmának ellenőrzése', () => {
    cy.visit('http://localhost:8000/kosar');
    cy.get('tr').should('have.length.gt', 0);
  });

  it('Hasonló termékek megjelenése', () => {
    cy.visit('http://localhost:8000/products/1');
    cy.get('.product-center .product-item').should('exist');
    cy.get('.product-center .product-item').its('length').should('be.gt', 0);
  });

  it('Related termék címe és ára', () => {
    cy.visit('http://localhost:8000/products/1');
    cy.get('.product-center .product-item').should('exist');

    cy.get('.product-center .product-item').each(($item) => {
      cy.wrap($item).within(() => {
        cy.get('.product-info span').should('not.be.empty');
        cy.get('.product-info h4').should('not.be.empty');
      });
    });
  });

  it('Related termék ikonjai és kosárba gomb', () => {
    cy.visit('http://localhost:8000/products/1');
    cy.get('.product-center .product-item').should('exist');

    cy.get('.product-center .product-item').each(($item) => {
      cy.wrap($item).within(() => {
        cy.get('.icons i').should('have.length', 3);
        cy.get('.addToCartBtn').should('exist');
      });
    });
  });
});