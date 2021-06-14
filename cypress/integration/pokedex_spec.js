/// <reference types="cypress" />

describe('Pokedex', () => {
  before(() => {
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0', { fixture: 'first_page_pokemons.json' });
    cy.visit('http://192.168.0.133:8080');
  });

  it('loads first page', () => {
    const CANTIDAD_PAGINAS = 56;
    const POKEMONS_PER_PAGE = 20;
    cy.get('#pagination').find('button')
      .should('have.length', CANTIDAD_PAGINAS);
    cy.get('#pagination>button').eq(0)
      .should('have.class', 'active');
    cy.get('.container').find('.col')
      .should('have.length', POKEMONS_PER_PAGE);
    cy.get('.modal')
      .should('not.be.visible');
  });

  it('loads a pokemon when selected', () => {
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/bulbasaur', { fixture: 'bulbasaur' });
    cy.get('.frame').eq(0)
      .click();
    cy.get('.modal')
      .should('be.visible');
    cy.get('#pokemon-height')
      .should('have.text', 'Height: 7');
    cy.get('#pokemon-type')
      .should('have.text', 'Type: grass');
    cy.get('#pokemon-weight')
      .should('have.text', 'Weight: 69');
    cy.get('#pokemon-abilities')
      .should('have.text', 'Abilities: overgrow, chlorophyll, ');
  });

  it('uses pagination', () => {
    cy.visit('http://192.168.0.133:8080');
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20', { fixture: 'second_page' });
    cy.get('#pagination>button').eq(1).click();
    cy.get('#pagination>button').eq(0)
      .should('not.have.class', 'active');
    cy.get('#pagination>button').eq(1)
      .should('have.class', 'active');
  });
});
