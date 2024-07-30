/// <reference types="cypress-xpath"/>
import searchPage from '@tests/page/search.page';
import assert from '@tests/helper/assert';

Cypress.on('uncaught:exception', (err, runnable) => {
    // Prevent test failure due to uncaught exceptions
    return false;
});

describe('Scenario 1: Search a property', () => {
    
    it('should search for a location with specified criteria', () => {
        // Visit the main page
        searchPage.visit();
        cy.wait(50000); // Wait for the page to load if there is a captcha
        cy.get('body').then(($body) => {
            if ($body.find('.uitk-toolbar-button-v2-content').length > 0) {
                // Click the toolbar button if it exists
                cy.get('.uitk-toolbar-button-v2-content').click();
            }
        }); 
        searchPage.closeCookiesPopup(); // Close the cookies popup
        searchPage.openSearchInput(); // Open the search input
        searchPage.enterDestination('Yogyakarta'); // Enter the search destination
        cy.wait(1000); // Wait for search results to appear
        searchPage.selectDestination('Yogyakarta'); // Select the destination from search results
        searchPage.openDateSelector(); // Open the date selector
        searchPage.selectDates('5', '20'); // Select the dates
        searchPage.closeDateSelector(); // Close the date selector
        searchPage.increaseAdults(3); // Increase the number of adults
        searchPage.search(); // Click the search button
        assert.verifyResults(); // Verify the search results
    });
});

describe('Scenario 2: Filter a property', () => {
    beforeEach(() => {
        // Visit the main page before each test
        searchPage.visit();
        cy.wait(50000); // Wait for the page to load if there is a captcha
        cy.get('body').then(($body) => {
            if ($body.find('.uitk-toolbar-button-v2-content').length > 0) {
                // Click the toolbar button if it exists
                cy.get('.uitk-toolbar-button-v2-content').click();
            }
        }); 
        searchPage.closeCookiesPopup(); // Close the cookies popup
        searchPage.openSearchInput(); // Open the search input
        searchPage.enterDestination('Yogyakarta'); // Enter the search destination
        cy.wait(1000); // Wait for search results to appear
        searchPage.selectDestination('Yogyakarta'); // Select the destination from search results
        searchPage.openDateSelector(); // Open the date selector
        searchPage.selectDates('10', '19'); // Select the dates
        searchPage.closeDateSelector(); // Close the date selector
        searchPage.increaseAdults(3); // Increase the number of adults
        searchPage.search(); // Click the search button
    });
    it('should filter properties by Pool under Popular section', () => {
        // Apply the pool filter
        searchPage.applyPoolFilter();
        cy.wait(3000); // Wait for a moment
        searchPage.buttonDonePoll()
        cy.wait(3000); // Wait for a moment
        assert.verifyResults(); // Verify the search results
    });
});