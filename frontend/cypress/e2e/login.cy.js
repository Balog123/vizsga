describe('Bejelentkezési űrlap ellenőrzése', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/bejelentkezes');
  });

  it('Bejelentkezés gomb működése üres mezők esetén', () => {
    cy.get('#loginbtn').click();
    cy.get('#sikeres-bejelentkezes-uzenet').should('have.text', 'Minden mezőt ki kell tölteni!');
  });

  it('A "Mégsem" gombra kattintás', () => {
    cy.get('#cancelbtn').click();
    cy.url().should('eq', 'http://localhost:8000/');
  });

  it('A "Regisztráljon be" hivatkozás átirányítása', () => {
    cy.get('#reg').click();
    cy.url().should('eq', 'http://localhost:8000/regisztracio');
  });

  it('Bejelentkezés rossz adatokkal', () => {
    cy.get('#loginEmail').type('user@user.com');
    cy.get('#loginPsw').type('rosszjelszo');
    cy.get('#loginbtn').click();
    cy.get('#sikeres-bejelentkezes-uzenet').should('have.text', 'Rossz email cím vagy jelszó');
  });

  it('Bejelentkezés helyes adatokkal', () => {
    cy.get('#loginEmail').type('user@user.com');
    cy.get('#loginPsw').type('user');
    cy.get('#loginbtn').click();
    cy.url().should('eq', 'http://localhost:8000/');
  });

  it('Bejelentkezés csak egy mezővel kitöltve', () => {
    cy.get('#loginEmail').type('user@user.com');
    cy.get('#loginbtn').click();
    cy.get('#sikeres-bejelentkezes-uzenet').should('have.text', 'Minden mezőt ki kell tölteni!');
  });
});
