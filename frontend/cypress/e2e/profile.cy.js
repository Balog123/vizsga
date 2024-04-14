describe('Profil oldal ellenőrzése', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8000/');

        cy.get('#userIcon').click();
        cy.url().should('eq', 'http://localhost:8000/regisztracio');
        cy.get('a[href="/bejelentkezes"]').click();
        cy.url().should('eq', 'http://localhost:8000/bejelentkezes');
        cy.get('#loginEmail').type('example@example.com');
        cy.get('#loginPsw').type('example');
        cy.get('#loginbtn').click();
        cy.url().should('eq', 'http://localhost:8000/');
    });

    it('Profilba lépés folyamata', () => {
        cy.get('#userIcon').click();
        cy.url().should('eq', 'http://localhost:8000/profil');
    });

    it('Mégsem gombra kattintás', () => {
        cy.get('#userIcon').click();
        cy.get('#cancelbtn').click();
        cy.url().should('eq', 'http://localhost:8000/');
    });

    it('Mentés gomb működése üres mezők esetén', () => {
        cy.get('#userIcon').click();
        cy.get('#felhasznaloVaros').clear();
        cy.get('#felhasznaloIranyitoszam').clear();
        cy.get('#felhasznaloCim').clear();
        cy.get('#saveChangesButton').click();
        cy.wait(1000);
        cy.get('#adatmodositasHiba').should('have.text', 'Töltsön ki legalább egy mezőt!');
    });

    it('Mentés gomb működése helytelen irányítószám esetén', () => {
        cy.get('#userIcon').click();

        cy.get('#felhasznaloVaros').clear();
        cy.get('#felhasznaloIranyitoszam').clear();
        cy.get('#felhasznaloCim').clear();

        cy.get('#felhasznaloVaros').type('Budapest');
        cy.get('#felhasznaloIranyitoszam').type('123');
        cy.get('#felhasznaloCim').type('Teszt utca 1.');
        cy.get('#saveChangesButton').click();
        cy.get('#adatmodositasIsz').should('have.text', 'Az Irányítószám 4 számjegyből kell álljon!');
    });

    it('Mentés gomb működése helyes adatokkal', () => {
        cy.get('#userIcon').click();

        cy.get('#felhasznaloVaros').clear();
        cy.get('#felhasznaloIranyitoszam').clear();
        cy.get('#felhasznaloCim').clear();

        cy.get('#felhasznaloVaros').type('Budapest');
        cy.get('#felhasznaloIranyitoszam').type('1234');
        cy.get('#felhasznaloCim').type('Teszt utca 1.');
        cy.get('#saveChangesButton').click();
        cy.get('#adatmodositasSiker').should('have.text', 'Felhasználói adatok mentése megtörtént');
    });

    it('Kijelentkezés gomb működése', () => {
        cy.get('#userIcon').click();
        cy.get('#logoutButton').click();
        cy.url().should('eq', 'http://localhost:8000/');
    });
});