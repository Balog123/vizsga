describe('Regisztráció', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/regisztracio');
  });

  it('Regisztráció ellenzőrzése', () => {
    cy.intercept('POST', 'http://localhost:8000/api/registration').as('registrationRequest');

    cy.get('#userIcon').click();

    cy.url().should('eq', 'http://localhost:8000/regisztracio');

    const testFirstName = 'test';
    const testLastName = 'test';
    const testEmail = 'test@test.com';
    const testPassword = 'test';

    cy.get('#registerFirstName').type(testFirstName);
    cy.get('#registerLastName').type(testLastName);
    cy.get('#registerEmail').type(testEmail);
    cy.get('#registerPsw').type(testPassword);
    cy.get('#registerbtn').click();

    cy.wait('@registrationRequest').then((interception) => {
      const response = interception.response.body;
      expect(response).to.have.property('success', true);
      cy.url().should('eq', 'http://localhost:8000/bejelentkezes');
    });
  });

  it('A "Jelentkezzen be" hivatkozás átirányítása', () => {
    cy.get('a[href="/bejelentkezes"]').click();
    cy.url().should('eq', 'http://localhost:8000/bejelentkezes');
  });

  it('A "Mégsem" gombra kattintás', () => {
    cy.get('#cancelbtn').click();
    cy.url().should('eq', 'http://localhost:8000/');
  });
});

describe('Regisztrációs űrlap ellenőrzése', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/regisztracio');
  });

  it('Regisztráció gomb működése üres mezők esetén', () => {
    cy.get('#registerbtn').click();
    cy.get('#sikertelen-reg').should('have.text', 'Kérjük, töltsön ki minden mezőt');
  });

  it('Regisztráció gomb működése helytelen email formátum esetén', () => {
    cy.get('#registerFirstName').type('Teszt');
    cy.get('#registerLastName').type('User');
    cy.get('#registerEmail').type('rosszemail');
    cy.get('#registerPsw').type('teszt123');
    cy.get('#registerbtn').click();
    cy.get('#sikertelen-reg').should('have.text', 'Helytelen email formátum');
  });

  it('Regisztráció gomb működése már regisztrált email cím esetén', () => {
    cy.get('#registerFirstName').clear().type('Keresztnév');
    cy.get('#registerLastName').clear().type('Vezetéknév');
    cy.get('#registerEmail').clear().type('user@user.com');
    cy.get('#registerPsw').clear().type('Jelszó');
    cy.get('#registerbtn').click();
    cy.get('#sikertelen-reg').should('have.text', 'Ez az email cím foglalt!');
  });
});
