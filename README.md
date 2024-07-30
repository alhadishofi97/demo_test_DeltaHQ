# demo_test_DeltaHQ

# Automation Testing Documentation with Cypress

## Description
This script uses Cypress to automate functional testing on the search page of the VRBO website. The script includes interactions with page elements such as date pickers, search inputs, and applying filters.

## Prerequisites
Before running this script, ensure you have the following:
- Node.js (version 12 or newer)
- npm (Node Package Manager) or yarn Package Manager

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/alhadishofi97/demo_test_DeltaHQ.git
   cd demo_test_DeltaHQ
   ```

2. **Install Dependencies**
   Run the following command to install Cypress and other dependencies:
   ```bash
   npm install
   ```

3. **Open Cypress**
   After the installation is complete, open Cypress with the command:
   ```bash
   npx cypress open or yarn cy:open
   ```

## Running Tests

1. Once Cypress is open, you will see the Cypress user interface.
2. Select the test file you want to run, for example, `search.test.js`.
3. Click on the file to execute the tests.

## Project Structure
```
/repo-name
│
├── /tests
|   │── /helper
|   |   └── assert.js           # validation page script
│   ├── /Page
│   │   └── search.page.js      # Search page script
│   │   
│   └── /Scenarios
│       └── search.test.js      # Scenario test script
│
├── package.json                 # npm configuration file
└── README.md                    # This documentation
```

## Additional Notes
- Make sure to adjust the URL and elements used in the script according to the application being tested.
- If you encounter issues with elements being missing or inaccessible, consider adding delays or adjusting the element selectors.

