class assert {
    // Verifikasi hasil pencarian
    verifyResults() {
        cy.get('[data-stid="results-header-messages-listings"] > .uitk-type-start').should('be.visible');
        cy.get('[data-stid="results-header-messages-listings"] > .uitk-type-start').invoke('text').then((text) => {
            const propertyCount = parseInt(text.split(' ')[0], 10);
            expect(propertyCount).to.be.greaterThan(0);
        });
    }
}

export default new assert();