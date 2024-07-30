class SearchPage {
    // Kunjungi halaman utama
    visit() {
        cy.visit('https://www.vrbo.com', { failOnStatusCode: false });
    }

    // Tutup popup cookies
    closeCookiesPopup() {
        cy.get('#onetrust-close-btn-container > .onetrust-close-btn-handler').click({ force: true });
    }

    // Buka input pencarian
    openSearchInput() {
        cy.get(':nth-child(2) > :nth-child(1) > .uitk-fake-input', { timeout: 10000 }).should('be.visible').click ({ force: true });
    }

    // Masukkan tujuan pencarian
    enterDestination(destination) {
        cy.get('#destination_form_field').clear().type(destination);
    }

    // Pilih tujuan dari hasil pencarian
    selectDestination(destination) {
        cy.get('.uitk-typeahead-result-item').each(($el, index) => {
            if ($el.text().includes(destination) && index === 0) {
                cy.wrap($el).click();
            }
        });
    }

    // Buka pemilih tanggal
    openDateSelector() {
        cy.get('[data-testid="uitk-date-selector-input1-default"]').click();
    }

        // Pilih tanggal dinamis berdasarkan indeks
    selectDates(startIndex, endIndex) {
        cy.xpath("//span[.='Start date']").click();
    
        cy.xpath("//div[@class='uitk-calendar uitk-calendar-day-selection-circle uitk-no-gridlines']//td")
        // Pilih tanggal mulai berdasarkan indeks
        .find("div") // Mencari elemen div di dalam td
        .eq(startIndex) // Menggunakan indeks untuk memilih elemen
        .click({ force: true }); // Klik dengan force
            // Pilih tanggal akhir berdasarkan indeks
        cy.xpath("//div[@class='uitk-calendar uitk-calendar-day-selection-circle uitk-no-gridlines']//td")
        .eq(endIndex) // Menggunakan indeks untuk memilih elemen
        .find("div") // Mencari elemen div di dalam td
        .click({ force: true, multiple: true}); // Klik dengan force
    
        cy.get('.uitk-sheet-footer > .uitk-layout-flex > .uitk-button-primary').as('submitButton');
        cy.get('@submitButton').click();
        cy.get('@submitButton').click(); // Klik lagi jika perlu
        }
    // selectDates(startDay, endDay) {
    //     cy.xpath("//span[.='Start date']").click();
    //     // Pilih tanggal mulai
    //     cy.xpath(`//div[@class='uitk-calendar uitk-calendar-day-selection-circle uitk-no-gridlines']//td[div[text()='${startDay}']]`).click();
        
    //     // Pilih tanggal akhir
    //     cy.xpath(`//div[@class='uitk-calendar uitk-calendar-day-selection-circle uitk-no-gridlines']//td[div[text()='${endDay}']]`).click();
    //     cy.get('.uitk-sheet-footer > .uitk-layout-flex > .uitk-button-primary').click();
    // }
    closeDateSelector() {
        cy.get('.uitk-sheet-footer > .uitk-layout-flex > .uitk-button-primary').click();
    }
    // Tambah jumlah dewasa
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

    // Klik tombol pencarian
    search() {
        cy.get('#search_button').click();
    }

    // Terapkan filter kolam renang
    applyPoolFilter() {
        cy.xpath('//button[@id="quick_filter_popular_group"]').click();
        cy.contains('label', 'Pool').click({ force: true, multiple: true })
        cy.get('#search_form_primary_button').click({ force: true });
    }
}

export default new SearchPage();