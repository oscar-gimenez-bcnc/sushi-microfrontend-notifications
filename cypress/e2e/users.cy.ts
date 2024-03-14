const path = require('path');

describe('UsersDetail spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9005/');
  });

  it('should show 10 users when data is fetched', () => {
    cy.get('.loading.loading-spinner').should('not.exist');
    cy.get('tbody tr').should('have.length', 10);
  });

  it('should download a .json file', () => {
    cy.get('.loading.loading-spinner').should('not.exist');
    cy.get('tbody tr').should('have.length', 10);

    cy.get('tbody tr').first().find('[aria-label="Download button"]').click();
    const downloadsFolder = Cypress.config('downloadsFolder');
    cy.readFile(path.join(downloadsFolder, 'user_1.json')).should('exist');
  });

  it('should download a .csv file', () => {
    cy.get('.loading.loading-spinner').should('not.exist');
    cy.get('tbody tr').should('have.length', 10);

    cy.get('[aria-label="Change download method"]').click();
    cy.get('tbody tr').first().find('[aria-label="Download button"]').click();
    const downloadsFolder = Cypress.config('downloadsFolder');
    cy.readFile(path.join(downloadsFolder, 'user_1.csv')).should('exist');
  });
});
