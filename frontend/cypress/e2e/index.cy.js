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
