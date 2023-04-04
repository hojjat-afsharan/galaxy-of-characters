describe("Star wars,", () => {
  beforeEach(() => {
    cy.visit("localhost:4200");
  });

  it("should contain title", () => {
    cy.viewport("macbook-13");
    cy.contains("The Cantina Crew: A Whimsical List of Star Wars Characters");
  });

  it("should contain simpler title in small screens", () => {
    cy.viewport("iphone-6");
    cy.contains("The Cantina Crew");
  });

  it("should show appropriate page number after click on next pagination button", () => {
    cy.get(".pagination__next-button").click();
    cy.get(".pagination__current-page").contains("2");
  });

  it("should show disabled previous navigation button in the first page after visit 2nd page and back to first page", () => {
    cy.get(".pagination__next-button").click();
    cy.get(".pagination__previous-button").click();
    cy.get(".pagination__previous-button").should("be.disabled");
  });

  it("should show character title after click on a character link: A person within the Star Wars universe", () => {
    cy.get(
      `.people-container > .card__container >  :nth-child(1) > :nth-child(1)`
    ).click();
    cy.get(".container__title").contains(
      "A person within the Star Wars universe"
    );
  });

  describe("character page", () => {
    beforeEach(() => {
      cy.visit("localhost:4200/people/1");
    });

    it("should open a planet page if inside character page", () => {
      cy.get(".planet__link").click();
      cy.get(".container__title").contains("A planet.");
    });

    it('should return to main page by click on back button (in small screens)', () => {
      cy.viewport("iphone-6");
      cy.get('.card__back').click();
      cy.contains("The Cantina Crew");

    });

    it('should return to main page by click on back button (in bigger screens)', () => {
      cy.viewport("macbook-13");
      cy.get('.card__back').click();
      cy.contains("The Cantina Crew: A Whimsical List of Star Wars Characters");
    });
  });

  describe("planet page", () => {
    beforeEach(() => {
      cy.visit("localhost:4200/planets/1");
    });

    it('should contain planet title', () => {
      cy.get(".container__title").contains("A planet.");
    });

    it('should return to chatacter page by click on back button', () => {
      cy.get('.card__back').click();
      cy.get(".container__title").contains(
        "A person within the Star Wars universe"
      );
    });
  });
});
