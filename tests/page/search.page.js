class SearchPage {
    // Visit the main page
    visit() {
        cy.visit('https://www.vrbo.com', { failOnStatusCode: false });
    }

    // Close the cookies popup
    closeCookiesPopup() {
        cy.get('#onetrust-close-btn-container > .onetrust-close-btn-handler').click({ force: true });
    }

    // Open the search input
    openSearchInput() {
        cy.get(':nth-child(2) > :nth-child(1) > .uitk-fake-input', { timeout: 10000 }).should('be.visible').click ({ force: true });
    }

    // Enter the search destination
    enterDestination(destination) {
        cy.get('#destination_form_field').clear().type(destination);
    }

    // Select destination from search results
    selectDestination(destination) {
        cy.get('.uitk-typeahead-result-item').each(($el, index) => {
            if ($el.text().includes(destination) && index === 0) {
                cy.wrap($el).click();
            }
        });
    }

    // Open the date selector
    openDateSelector() {
        cy.get('[data-testid="uitk-date-selector-input1-default"]').click();
    }

    // Select start and end dates
    selectDates(startDate, endDate) 
    {
        cy.get('.uitk-day').filter((index, element) => element.innerText.trim() === startDate).click({multiple: true});
        cy.wait(2000);
        cy.get('.uitk-day').filter((index, element) => element.innerText.trim() === endDate).click({multiple: true});
    }

    // Close the date selector
    closeDateSelector() {
        cy.get('.uitk-sheet-footer > .uitk-layout-flex > .uitk-button-primary').click();
    }

    // Increase the number of adults
    increaseAdults(count) {
        cy.get('.uitk-field > .uitk-menu-trigger').click();
        cy.xpath("//span[.='Increase the number of adults']").then(($buttons) => {
            let count = 0;
            for (let i = 0; i < $buttons.length; i++) {
                if (count >= 3) break;
                cy.wrap($buttons[i]).click();
                count++;
            }
        });
        cy.get('#traveler_selector_done_button').click();
    }

    // Click the search button
    search() {
        cy.get('#search_button').click();
    }

    // Apply the pool filter
    applyPoolFilter() {
        cy.xpath('//button[@id="quick_filter_popular_group"]').click();
        cy.contains('label', 'Pool').click({ force: true, multiple: true });
    }

    // Click the done button for the search form
    buttonDonePoll() {
        cy.get('#search_form_primary_button', { timeout: 5000 }).should('be.visible').click({ force: true });
    }
}

export default new SearchPage();