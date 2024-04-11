describe('', () => {
  it('passes', () => {
    cy.visit('http://localhost:8000')
  })
})

describe('Termék oldal és termékek betöltése', () => {
  it('Kattintás a "Termékek" hivatkozásra és URL ellenőrzése', () => {
    cy.visit('http://localhost:8000');
    cy.get('li.with-dropdown.nav-item a').should('contain.text', 'Termékek').click();
    cy.url().should('eq', 'http://localhost:8000/products');
    cy.get('.product-item').should('exist');
  });
});

describe('Navigációs sáv változásának ellenőrzése', () => {
  it('Lefele való görgetéskor a navbárnak meg kell változnia', () => {
    cy.visit('http://localhost:8000');
    cy.get('.header').should('not.have.class', 'scrolled');
    cy.scrollTo('bottom');
    cy.wait(10);
    cy.get('.header').should('have.class', 'scrolled');
  });
});