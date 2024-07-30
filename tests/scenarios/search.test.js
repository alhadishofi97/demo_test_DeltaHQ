/// <reference types="cypress-xpath"/>
import searchPage from '@tests/page/search.page';
import assert from '@tests/helper/assert';
import DatePicker from '../page/datepicker.page';

Cypress.on('uncaught:exception', (err, runnable) => {
    // Menghindari kegagalan tes karena pengecualian yang tidak tertangkap
    return false;
});


describe('Scenario 1: Search a property', () => {
    const datePicker = new DatePicker();
    
    it('should search for a location with specified criteria', () => {
        // Kunjungi halaman utama
        
        searchPage.visit();
        cy.wait(40000); // Tunggu halaman dimuat jika terdapat captcha
        cy.get('body').then(($body) => {
            if ($body.find('.uitk-toolbar-button-v2-content').length > 0) {
                cy.get('.uitk-toolbar-button-v2-content').click();
            }
        }); 
        searchPage.closeCookiesPopup(); // Tutup popup cookies
        searchPage.openSearchInput(); // Buka input pencarian
        searchPage.enterDestination('Bali'); // Masukkan tujuan pencarian
        cy.wait(1000); // Tunggu hasil pencarian muncul
        searchPage.selectDestination('Bali'); // Pilih tujuan dari hasil pencarian
        searchPage.openDateSelector(); // Buka pemilih tanggal
        searchPage.selectDates(7, 3); 
        // cy.xpath("//div[@class='uitk-calendar uitk-calendar-day-selection-circle uitk-no-gridlines']//td[3]/div[.='30']").click({force: true});
        // cy.xpath("//div[@class='uitk-calendar uitk-calendar-day-selection-circle uitk-no-gridlines']//td[7]/div[.='3']").click( {force: true}); //pilih tanggal end
        searchPage.closeDateSelector(); // Tutup pemilih tanggal
        searchPage.increaseAdults(3); // Tambah jumlah dewasa
        searchPage.search(); // Klik tombol pencarian
        assert.verifyResults(); // Verifikasi hasil pencarian
    });
});

describe('Scenario 2: Filter a property', () => {
    beforeEach(() => {
        // Pre-condition: Buka halaman hasil pencarian
        searchPage.visit();
        cy.wait(35000); // Tunggu halaman dimuat jika terdapat captcha
        cy.get('body').then(($body) => {
            if ($body.find('.uitk-toolbar-button-v2-content').length > 0) {
                cy.get('.uitk-toolbar-button-v2-content').click();
            }
        });
        searchPage.closeCookiesPopup(); // Tutup popup cookies
        searchPage.openSearchInput(); // Buka input pencarian
        searchPage.enterDestination('Yogyakarta'); // Masukkan tujuan pencarian
        cy.wait(3000); // Tunggu hasil pencarian muncul
        searchPage.selectDestination('Yogyakarta'); // Pilih tujuan dari hasil pencarian
        cy.xpath("//div[@class='uitk-calendar uitk-calendar-day-selection-circle uitk-no-gridlines']//td[3]/div[.='30']").click({force: true});
        cy.xpath("//div[@class='uitk-calendar uitk-calendar-day-selection-circle uitk-no-gridlines']//td[7]/div[.='3']").click( {force: true}); //pilih tanggal end
        searchPage.increaseAdults(3); // Tambah jumlah dewasa
        searchPage.search(); // Klik tombol pencarian
    });

    it('should filter properties by Pool under Popular section', () => {
        // Terapkan filter kolam renang
        searchPage.applyPoolFilter();
        assert.verifyResults(); // Verifikasi hasil pencarian
        cy.wait(3000); // Tunggu beberapa saat
        searchPage.applyPoolFilter(); // Terapkan filter kolam renang lagi
        assert.verifyResults(); // Verifikasi hasil pencarian
    });
});