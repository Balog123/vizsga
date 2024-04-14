describe('Navigációs sáv linkek és ikonok ellenőrzése', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000');
  });

  it('Kattintás a "Kezdőlap" hivatkozásra és URL ellenőrzése', () => {
    cy.get('.nav-link').contains('Kezdőlap').click();
    cy.url().should('eq', 'http://localhost:8000/');
  });

  it('Kattintás a "Termékek" hivatkozásra és URL ellenőrzése', () => {
    cy.get('li.with-dropdown.nav-item a').contains('Termékek').click();
    cy.url().should('eq', 'http://localhost:8000/products');
  });

  it('Kattintás a "Kategóriák" hivatkozásra és URL ellenőrzése', () => {
    cy.get('li.nav-item a[href="#kategoria"]').click();
    cy.url().should('eq', 'http://localhost:8000/#kategoria');
  });

  it('Kattintás a "Galéria" hivatkozásra és URL ellenőrzése', () => {
    cy.get('li.nav-item a[href="#galeria"]').click();
    cy.url().should('eq', 'http://localhost:8000/#galeria');
  });

  it('Kattintás a "Kapcsolat" hivatkozásra és URL ellenőrzése', () => {
    cy.get('li.nav-item a[href="#kapcsolat"]').click();
    cy.url().should('eq', 'http://localhost:8000/#kapcsolat');
  });

  it('Kattintás az "ÁSZF" hivatkozásra és URL ellenőrzése', () => {
    cy.get('li.nav-item a[href="/aszf"]').click();
    cy.url().should('eq', 'http://localhost:8000/aszf');
  });

  it('Profil ikon URL ellenőrzése', () => {
    cy.get('#userIcon').click();
    cy.url().should('eq', 'http://localhost:8000/regisztracio');
    cy.get('h1').should('contain', 'Regisztráció');
  });

  it('Keresés ikon ellenőrzése', () => {
    cy.get('#searchIcon').click();
    cy.get('#searchBar.search-bar-container').should('exist');
  });

  it('Kosár ikon ellenőrzése', () => {
    cy.get('#kosaricon').click();
    cy.url().should('eq', 'http://localhost:8000/kosar');
    cy.get('#cart-table').should('exist');
    cy.get('#cart-table thead th').eq(0).should('contain', 'Termék neve');
    cy.get('#cart-table thead th').eq(1).should('contain', 'Kép');
    cy.get('#cart-table thead th').eq(2).should('contain', 'Ár');
    cy.get('#cart-table thead th').eq(3).should('contain', 'Mennyiség');
    cy.get('#cart-table thead th').eq(4).should('contain', 'Módosítás');
  });
});

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

describe('Kezdőlap gomb ellenőrzése', () => {
  it('Vásárlás gombra való kattintáskor a termékek betöltése', () => {
    cy.visit('http://localhost:8000');
    cy.get('.btn').contains('Vásárlás').click().then(() => {
      cy.url().should('eq', 'http://localhost:8000/products');
    });
  });
})

describe('Népszerű kategóriák szekció ellenőrzése', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000');
  });

  it('Kattintás a "Nappali" kategóriára, URL és termékek ellenőrzése', () => {
    cy.contains('.cat a', 'Nappali').click();
    cy.url().should('eq', 'http://localhost:8000/category.html?category=nappali');
    cy.get('.product-info').should('have.length.gt', 0);
  });

  it('Kattintás a "Hálószoba" kategóriára, URL és termékek ellenőrzése', () => {
    cy.contains('.cat a', 'Hálószoba').click();
    cy.url().should('eq', 'http://localhost:8000/category.html?category=haloszoba');
    cy.get('.product-info').should('have.length.gt', 0);
  });

  it('Kattintás az "Irodai" kategóriára, URL és termékek ellenőrzése', () => {
    cy.contains('.cat a', 'Irodai').click();
    cy.url().should('eq', 'http://localhost:8000/category.html?category=irodai');
    cy.get('.product-info').should('have.length.gt', 0);
  });
});

describe('Legújabb termékek szekció ellenőrzés', () => {
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
});

describe('Kapcsolatfelvétel', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000');
  });

  it('Info gomb megnyitása és bezárása', () => {
    cy.get('#infoBtn').click();
    cy.get('.popup2').should('be.visible');
    cy.get('#closeBtn').click();
    cy.get('.popup2').should('not.be.visible');
  });

  it('Érvényes e-mail küldése', () => {
    const validEmail = 'teszt@teszt.com';
    cy.get('.contact form input[name="email"]').clear().type(validEmail);

    cy.get('.contact form button[type="submit"]').click();

    cy.contains('Email sikeresen elküldve!').should('be.visible');
  });

  it('Érvénytelen e-mail küldése', () => {
    const invalidEmail = 'asd@asd';
    cy.get('.contact form input[name="email"]').type(invalidEmail);

    cy.get('.contact form button[type="submit"]').click();

    cy.contains('Érvénytelen email formátum.').should('be.visible');
  });
});

describe('Footer ellenőrzése', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000');
  });

  it('Kezdőlap, Kapcsolat és GitHub ikon link működése', () => {
    cy.get('.footer .col:nth-child(1) a[href="/"]').click();
    cy.url().should('eq', 'http://localhost:8000/');

    cy.get('.footer .col:nth-child(2) a[href="#kapcsolat"]').click();
    cy.url().should('eq', 'http://localhost:8000/#kapcsolat');
  });

  it('GitHub ikon link megnyitása új ablakban', () => {
    cy.get('.footer .col:nth-child(3) a[href="https://github.com/Balog123/vizsga"]').should('have.attr', 'target', '_blank');
  });
});