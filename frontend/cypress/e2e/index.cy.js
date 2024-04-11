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

describe('Navigációs sáv URL linek ellenőrzése', () => {
  it('Kattintás a "Kezdőlap" hivatkozásra és URL ellenőrzése', () => {
    cy.visit('http://localhost:8000');
    cy.get('.nav-link').scrollTo
  })
});

describe('Ikonok betöltődésének ellenőrzése', () => {
  it('Profil ikon URL ell', () => {
    cy.visit('http://localhost:8000');
    cy.get('#userIcon').click().then(() => {
      cy.url().should('eq', 'http://localhost:8000/regisztracio');
      cy.get('h1').should('contain', 'Regisztráció');
    });
  });

  it('Keresés ikon ellenőrzése', () => {
    cy.visit('http://localhost:8000');
    cy.get('#searchIcon').click().then(() => {
      cy.get('#searchBar.search-bar-container').should('exist');
    });
  });

  it('Kosár ikon ellenőrzése', () => {
    cy.visit('http://localhost:8000');
    cy.get('#kosaricon').click().then(() => {
      cy.url().should('eq', 'http://localhost:8000/kosar');

      cy.get('#cart-table').should('exist');
      cy.get('#cart-table thead th').eq(0).should('contain', 'Termék neve');
      cy.get('#cart-table thead th').eq(1).should('contain', 'Kép');
      cy.get('#cart-table thead th').eq(2).should('contain', 'Ár');
      cy.get('#cart-table thead th').eq(3).should('contain', 'Mennyiség');
      cy.get('#cart-table thead th').eq(4).should('contain', 'Módosítás');
    });
  });
});
