export const BASE_URL = {
    DASHBOARD: Cypress.env('baseURL')

};

export function visit(routes) {
    if (!routes) {
        throw new Error('Routes parameter is required');
    }
    cy.visit(BASE_URL.DASHBOARD + routes);
}