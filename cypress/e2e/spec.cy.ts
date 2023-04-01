describe('Star wars', () => {

  beforeEach(() => {
  })

  it('should contain title', () => {
    cy.visit('localhost:4200');
    cy.viewport("macbook-13");
    cy.contains('The Cantina Crew: A Whimsical List of Star Wars Characters');
  })

  it('should contain simpler title in small screens', () => {
    cy.visit('localhost:4200');
    cy.viewport("iphone-6");
    cy.contains('The Cantina Crew');
  })
})